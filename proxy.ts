import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateJWT } from './lib/utils';

export async function proxy(request: NextRequest) {
	try {
		const nextCookies = await cookies();
		const authToken = nextCookies.get('resumevx:auth');
		if (!authToken || !validateJWT(authToken.value)) return NextResponse.redirect(new URL('/auth/login', request.url));
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
