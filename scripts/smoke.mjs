import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { setTimeout as delay } from 'node:timers/promises';
const require=createRequire(import.meta.url);
const port=process.env.SMOKE_PORT || '3417';
const base=process.env.SMOKE_BASE_URL || `http://127.0.0.1:${port}`;
const server=process.env.SMOKE_BASE_URL ? null : spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port',port],{
  env:{...process.env,AUTH_SECRET:'local-smoke-only-not-a-real-authentication-secret',AUTH_TRUST_HOST:'true',AUTH_MICROSOFT_ENTRA_ID_ID:'00000000-0000-0000-0000-000000000000',AUTH_MICROSOFT_ENTRA_ID_SECRET:'local-smoke-only',AUTH_MICROSOFT_ENTRA_ID_ISSUER:'00000000-0000-0000-0000-000000000000'},
  stdio:['ignore','pipe','pipe'],
});
let serverOutput='';
server?.stdout.on('data',data=>{serverOutput+=data;});
server?.stderr.on('data',data=>{serverOutput+=data;});
try {
 let ready=false;
 for(let i=0;i<90;i++) {
   try { const r=await fetch(`${base}/signin`); if(r.ok) {ready=true;break;} } catch {}
   if(server?.exitCode!==null && server?.exitCode!==undefined) throw new Error('Server exited before readiness');
   await delay(500);
 }
 assert(ready,'Sign-in page becomes ready');
 const signin=await fetch(`${base}/signin`); const html=await signin.text();
 assert.equal(signin.status,200);
 assert.match(html,/Sign in with Microsoft Entra ID/);
 assert(!html.includes('Hello, Unknown user'));
 for(const route of ['/','/private-test','/signin/../private-test']) {
   for(const headers of [{},{'x-middleware-subrequest':'src/middleware:middleware:src/middleware:middleware:src/middleware'}]) {
     const result=await fetch(base+route,{redirect:'manual',headers});
     assert([302,303,307,308].includes(result.status),`${route} rejects unauthenticated access`);
     assert.equal(new URL(result.headers.get('location'),base).pathname,'/signin');
   }
 }
 const session=await fetch(`${base}/api/auth/session`);
 assert.equal(session.status,200); assert.equal(await session.json(),null);
 const csrf=await fetch(`${base}/api/auth/csrf`);
 assert.equal(csrf.status,200); assert.equal(typeof (await csrf.json()).csrfToken,'string');
 const script=html.match(/<script[^>]+src="([^"]+)"/); assert(script,'Hydration script present');
 assert.equal((await fetch(new URL(script[1].replaceAll('&amp;','&'),base))).status,200);
 const css=html.match(/<link[^>]+href="([^"]+\.css[^\"]*)"/); assert(css,'Stylesheet present');
 assert.equal((await fetch(new URL(css[1].replaceAll('&amp;','&'),base))).status,200);
 const image=html.match(/src="([^\"]*\/_next\/image[^\"]*)"/); assert(image,'Optimized logo present');
 assert.equal((await fetch(new URL(image[1].replaceAll('&amp;','&'),base))).status,200);
 console.log('PASS: sign-in, six unauthenticated access probes, empty session, CSRF, JS, CSS and optimized logo. No sign-in or Graph requests sent.');
} catch(error) {
 console.error(error.message);
 if(server) console.error(serverOutput.replace(/(?:secret|token|password)\s*[=:]\s*[^\s]+/gi,'[redacted]'));
 process.exitCode=1;
} finally {
 if(server) server.kill();
}
