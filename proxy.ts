import { NextRequest, NextResponse } from 'next/server';
import { AuthApi } from './lib/api';
import { headers } from 'next/headers';

export async function proxy(request: NextRequest) {
	try {
		const { data } = await AuthApi.getSession({ headers: await headers() });
		if (!data || !data.user || !data.session) return NextResponse.redirect(new URL('/auth/login', request.url));
		return NextResponse.next();
	} catch (error: any) {
		console.error('Error from proxy', error);
		return NextResponse.redirect(new URL(`/error?source=proxy&type=unknown`, request.url));
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth/*|error).*)',
};
