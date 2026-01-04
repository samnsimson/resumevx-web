import { HStack, Stack } from '@chakra-ui/react';
import { PreviewComponent } from '@/components/dashboard/chat-and-preview/preview';
import { ChatComponent } from '@/components/dashboard/chat-and-preview/chat';
import { SessionState } from '@/lib/api';
import { Suspense } from 'react';
import { Loader } from '@/components/ui/loader';

interface ChatAndPreviewComponentProps {
	sessionState: SessionState;
}

export async function ChatAndPreviewComponent({ sessionState }: ChatAndPreviewComponentProps) {
	return (
		<HStack boxSize={'full'} divideX={'1px'} divideColor={'border'}>
			<Stack width={'8/12'} height={'full'}>
				<Suspense fallback={Loader({ size: 'lg' })}>
					<PreviewComponent sessionState={sessionState} />
				</Suspense>
			</Stack>
			<Stack width={'4/12'} height={'full'} bg={'bg.panel'}>
				<ChatComponent />
			</Stack>
		</HStack>
	);
}
