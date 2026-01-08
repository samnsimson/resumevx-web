import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeJWT, validateJWT } from '@/lib/utils';
import { UserSession } from '@/lib/api';

function redirectTo(request: Request, module: 'login' | 'verification' | 'dashboard', params: URLSearchParams = new URLSearchParams()): NextResponse {
	const searchParams = params ? `?${params.toString()}` : '';
	if (module === 'login') return NextResponse.redirect(new URL(`/auth/login${searchParams}`, request.url));
	if (module === 'verification') return NextResponse.redirect(new URL(`/auth/verify-email${searchParams}`, request.url));
	if (module === 'dashboard') return NextResponse.redirect(new URL(`/dashboard${searchParams}`, request.url));
	return NextResponse.redirect(new URL(`/auth/login${searchParams}`, request.url));
}

export async function proxy(request: NextRequest) {
	try {
		const nextCookies = await cookies();
		const currentPath = request.nextUrl.pathname;
		const authToken = nextCookies.get('resumevx:auth');
		if (!authToken || !validateJWT(authToken.value)) return redirectTo(request, 'login');

		const payload = decodeJWT<UserSession>(authToken.value);
		if (!payload) return redirectTo(request, 'login');
		if (payload.user.emailVerified !== true) return redirectTo(request, 'verification');

		const response = NextResponse.next();
		response.headers.set('x-current-path', currentPath);
		return response;
	} catch (error: any) {
		console.error('Error from proxy', error);
		return NextResponse.redirect(new URL(`/error?source=proxy&type=unknown`, request.url));
	}
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
