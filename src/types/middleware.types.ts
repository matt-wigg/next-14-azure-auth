import type { NextRequest } from 'next/server';
import type { Session } from 'next-auth';

export interface AuthenticatedNextRequest extends NextRequest {
  auth?: Session | null;
}
