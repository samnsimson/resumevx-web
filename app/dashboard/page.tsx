import { DashboardFormProvider } from '@/lib/hooks/useDataInputForm';
import { HStack, Show, Stack } from '@chakra-ui/react';
import { SessionStateApi } from '@/lib/api';
import { headers } from 'next/headers';
import { createElement } from 'react';
import { DataInputPage } from './_pages/data-input';
import { PreviewPage } from './_pages/preview';
import { ChatPage } from './_pages/chat';

export default async function DashboardPage({}: PageProps<'/dashboard'>) {
	const nextHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: nextHeaders });
	return (
		<DashboardFormProvider>
			<HStack width={'full'} height={'full'} gap={0} divideX={'1px'}>
				<Show when={sessionState} fallback={createElement(DataInputPage)}>
					<Stack width={'8/12'} height={'full'} bg={'bg.muted'}>
						<PreviewPage sessionState={sessionState} />
					</Stack>
					<Stack width={'4/12'} height={'full'}>
						<ChatPage sessionState={sessionState} />
					</Stack>
				</Show>
			</HStack>
		</DashboardFormProvider>
	);
}
