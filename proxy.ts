import { NextRequest, NextResponse } from 'next/server';
import { AuthApi } from './lib/api';
import { headers } from 'next/headers';
import { parseHeaders } from './lib/utils';

export async function proxy(request: NextRequest) {
	try {
		const nextHeaders = await headers();
		const { data } = await AuthApi.getSession({ headers: parseHeaders(nextHeaders) });
		if (!data || !data.user || !data.session) return NextResponse.redirect(new URL('/auth/login', request.url));
		const response = NextResponse.next();
		response.headers.set('x-current-path', request.nextUrl.pathname);
		return response;
	} catch (error: any) {
		console.error('Error from proxy', error);
		return NextResponse.redirect(new URL(`/error?source=proxy&type=unknown`, request.url));
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth/*|error).*)',
};
