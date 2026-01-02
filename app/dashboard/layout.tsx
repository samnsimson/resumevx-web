import { Header } from '@/components/ui/header';
import { HStack, Show, Spacer, Stack } from '@chakra-ui/react';
import { DashboardFormProvider } from '@/lib/hooks/useDataInputForm';
import { WorkSpaceSidebar } from '@/components/dashboard/sidebar';
import { SessionStateApi } from '@/lib/api';
import { headers } from 'next/headers';

export default async function DashboardLayout({ chat, preview, dataInput }: LayoutProps<'/dashboard'>) {
	const requestHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: requestHeaders });
	return (
		<Stack flex={1} height={'100vh'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'} overflow={'hidden'}>
			<Header bg={'bg.panel'} />
			<HStack width={'full'} height={'calc(100vh - 72px)'} gap={0} divideX={'1px'}>
				<Stack width={'2/12'} height={'full'}>
					<WorkSpaceSidebar />
				</Stack>
				<Spacer>
					<DashboardFormProvider>
						<HStack width={'full'} height={'full'} gap={0} divideX={'1px'}>
							<Show when={sessionState} fallback={dataInput}>
								<Stack width={'8/12'} height={'full'} bg={'bg.muted'}>
									{preview}
								</Stack>
								<Stack width={'4/12'} height={'full'}>
									{chat}
								</Stack>
							</Show>
						</HStack>
					</DashboardFormProvider>
				</Spacer>
			</HStack>
		</Stack>
	);
}
