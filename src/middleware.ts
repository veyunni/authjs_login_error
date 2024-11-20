'use server-only'

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from './auth';
import { signIn } from './auth';

export default async function middleware(request: NextRequest) {
    const session = await auth();
  
    const isProtectedRoute = true;

    if (!session && isProtectedRoute) {
        const referer:string = request.headers.get('referer') as string;

        // If the referer is null, route to the application's home page.
        const destination:string = (referer == null) ?  "/" : referer;
        return NextResponse.redirect(request.nextUrl.origin + "/api/auth/signin?callbackUrl=" + destination);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ 
        {
            source: '/admin/:path*',
        }
    ]
}
