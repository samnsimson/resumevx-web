import { Header } from '@/components/ui/header';
import { HStack, Show, Stack } from '@chakra-ui/react';
import { MySpaceFormProvider } from '@/lib/hooks/useMySpaceForm';
import { WorkSpaceSidebar } from '@/components/my-space/sidebar';
import { SessionStateApi } from '@/lib/api';
import { headers } from 'next/headers';

export default async function MySpaceLayout({ chat, preview, dataInput }: LayoutProps<'/my-space'>) {
	const requestHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: requestHeaders });
	return (
		<Stack height={'100vh'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'} overflow={'hidden'}>
			<Header bg={'bg.panel'} />
			<HStack width={'full'} height={'full'} gap={0} divideX={'1px'}>
				<Stack width={'2/12'} height={'full'}>
					<WorkSpaceSidebar />
				</Stack>
				<Stack width={'10/12'} height={'full'}>
					<MySpaceFormProvider>
						<HStack width={'full'} height={'full'} gap={0} divideX={'1px'}>
							<Show when={sessionState} fallback={dataInput}>
								<Stack width={'8/12'} height={'full'} bg={'bg.emphasized'}>
									{preview}
								</Stack>
								<Stack width={'4/12'} height={'full'}>
									{chat}
								</Stack>
							</Show>
						</HStack>
					</MySpaceFormProvider>
				</Stack>
			</HStack>
		</Stack>
	);
}
