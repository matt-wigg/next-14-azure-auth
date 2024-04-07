import { NextResponse } from "next/server";

export function isPublicRoute(pathname: string) {
  return ["/login"].includes(pathname);
}

export function redirectToLogin(nextUrl: URL) {
  return NextResponse.redirect(new URL("/login", nextUrl.origin));
}

export function redirectToWelcome(nextUrl: URL) {
  return NextResponse.redirect(new URL("/", nextUrl.origin));
}
