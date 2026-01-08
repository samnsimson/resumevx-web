import { Header } from '@/components/ui/header';
import { HStack, Stack } from '@chakra-ui/react';
import { WorkSpaceSidebar } from '@/components/dashboard/sidebar';
import { DataInputFormProvider } from '@/lib/hooks/useDataInputForm';
import { cookies, headers } from 'next/headers';
import { AuthApi } from '@/lib/api';
import { parseHeaders } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
	const nextCookies = await cookies();
	const cookieToken = nextCookies.get('resumevx:auth');
	if (!cookieToken) return redirect('/auth/login');

	const nextHeaders = await headers();
	const { data } = await AuthApi.getSession({ headers: parseHeaders(nextHeaders) });
	if (!data) return redirect('/auth/login');
	if (!data.user.emailVerified) return redirect('/auth/verify-email');

	return (
		<Stack flex={1} height={'100vh'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'} overflow={'hidden'}>
			<Header bg={'bg.panel'} />
			<HStack width={'full'} height={'calc(100vh - 72px)'} gap={0} divideX={'1px'}>
				<Stack width={'2/12'} height={'full'}>
					<WorkSpaceSidebar />
				</Stack>
				<Stack width={'10/12'} height={'full'} bg={'bg.muted'}>
					<DataInputFormProvider>{children}</DataInputFormProvider>
				</Stack>
			</HStack>
		</Stack>
	);
}
