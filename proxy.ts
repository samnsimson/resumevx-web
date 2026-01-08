import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
	try {
		const currentPath = request.nextUrl.pathname;
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
