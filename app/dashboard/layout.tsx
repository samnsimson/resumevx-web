import { Header } from '@/components/ui/header';
import { HStack, Show, Stack } from '@chakra-ui/react';
import { WorkSpaceSidebar } from '@/components/dashboard/sidebar';
import { headers } from 'next/headers';
import { SessionStateApi } from '@/lib/api';

export default async function DashboardLayout({ children, chat, preview, start }: LayoutProps<'/dashboard'>) {
	const nextHeaders = await headers();
	const currentPath = nextHeaders.get('x-current-path');
	const isMainDashboard = currentPath === '/dashboard';

	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: nextHeaders });

	return (
		<Stack flex={1} height={'100vh'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'} overflow={'hidden'}>
			<Header bg={'bg.panel'} />
			<HStack width={'full'} height={'calc(100vh - 72px)'} gap={0} divideX={'1px'}>
				<Stack width={'2/12'} height={'full'}>
					<WorkSpaceSidebar />
				</Stack>
				<HStack boxSize={'full'} divideX={'1px'} divideColor={'border'} gap={0}>
					<Show when={isMainDashboard} fallback={children}>
						<Show when={sessionState} fallback={start}>
							<Stack width={'8/12'} height={'full'} bg={'bg.muted'}>
								{preview}
							</Stack>
							<Stack width={'4/12'} height={'full'}>
								{chat}
							</Stack>
						</Show>
					</Show>
				</HStack>
			</HStack>
		</Stack>
	);
}
