import { AuthApi, Subscription, SubscriptionsApi, UserSession } from '@/lib/api';
import { parseHeaders, validateJWT } from '@/lib/utils';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSession(): Promise<UserSession | null> {
	const cookiePromise = cookies();
	const headerPromise = headers();

	const [cookie, header] = await Promise.all([cookiePromise, headerPromise]);
	const cookieToken = cookie.get('resumevx:auth');
	if (!cookieToken || !validateJWT(cookieToken.value)) return redirect('/auth/login');

	const { data } = await AuthApi.getSession({ headers: parseHeaders(header) });
	if (!data) return null;
	return data;
}

export async function getSubscription(): Promise<Subscription | null> {
	const nextHeaders = await headers();
	const { data } = await SubscriptionsApi.getSubscription({ headers: parseHeaders(nextHeaders) });
	if (!data) return null;
	return data;
}
