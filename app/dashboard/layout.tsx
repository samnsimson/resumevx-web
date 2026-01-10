import { Header } from '@/components/ui/header';
import { HStack, Stack } from '@chakra-ui/react';
import { WorkSpaceSidebar } from '@/components/dashboard/sidebar';
import { DataInputFormProvider } from '@/lib/hooks/useDataInputForm';
import { getSession, getSubscription } from '@/actions';
import { redirect } from 'next/navigation';
import { AccessControlProvider } from '@/components/providers/access-control.provider';

export default async function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
	const session = await getSession();
	if (!session) return redirect('/auth/login');
	if (!session.user.emailVerified) return redirect('/auth/verify-email');
	const subscription = await getSubscription();

	return (
		<AccessControlProvider subscription={subscription} session={session}>
			<Stack flex={1} height={'100vh'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'}>
				<Header bg={'bg.panel'} />
				<HStack width={'full'} height={'calc(100vh - 72px)'} gap={0} divideX={'1px'}>
					<Stack width={'2/12'} height={'full'}>
						<WorkSpaceSidebar />
					</Stack>
					<Stack width={'10/12'} height={'full'} bg={'bg.muted'} overflow={'scroll'}>
						<DataInputFormProvider>{children}</DataInputFormProvider>
					</Stack>
				</HStack>
			</Stack>
		</AccessControlProvider>
	);
}
