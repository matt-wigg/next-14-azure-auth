import { NextResponse } from 'next/server';

export function isPublicRoute(pathname: string) {
  return ['/signin'].includes(pathname);
}

export function redirectToSignIn(nextUrl: URL) {
  return NextResponse.redirect(new URL('/signin', nextUrl.origin));
}

export function redirectToWelcome(nextUrl: URL) {
  return NextResponse.redirect(new URL('/', nextUrl.origin));
}
