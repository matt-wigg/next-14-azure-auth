import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  isPublicRoute,
  redirectToSignIn,
  redirectToWelcome,
} from '@/utils/middleware.utils';
import { AuthenticatedNextRequest } from '@/types/middleware.types';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req: AuthenticatedNextRequest) => {
  try {
    const { nextUrl } = req;
    const isAuthenticated = !!req.auth?.user;
    const isValidPublicRoute = isPublicRoute(nextUrl.pathname);

    if (isValidPublicRoute && isAuthenticated) {
      return redirectToWelcome(nextUrl);
    }

    if (!isAuthenticated && !isValidPublicRoute) {
      return redirectToSignIn(nextUrl);
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return redirectToSignIn(req.nextUrl);
  }
});
