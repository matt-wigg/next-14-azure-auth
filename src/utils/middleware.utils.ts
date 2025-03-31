import { NextResponse } from "next/server";
import { ROUTES } from "@/config/routes.config";

export function isPublicRoute(pathname: string) {
  return [ROUTES.INTERNAL.SIGN_IN].includes(pathname);
}

export function redirectToSignIn(nextUrl: URL) {
  return NextResponse.redirect(
    new URL(ROUTES.INTERNAL.SIGN_IN, nextUrl.origin)
  );
}

export function redirectToWelcome(nextUrl: URL) {
  return NextResponse.redirect(
    new URL(ROUTES.INTERNAL.WELCOME, nextUrl.origin)
  );
}
