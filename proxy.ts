import { NextRequest, NextResponse } from 'next/server';
import { AuthApi } from './lib/api';
import { headers } from 'next/headers';

export async function proxy(request: NextRequest) {
	const { data } = await AuthApi.getSession({ headers: await headers() });
	if (!data || !data.user || !data.session) return NextResponse.redirect(new URL('/auth/login', request.url));
	return NextResponse.next();
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)',
};
