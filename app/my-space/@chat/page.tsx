import { ChatConversation } from '@/components/chat-widget/chat-conversation';
import { ChatInput } from '@/components/chat-widget/chat-input';
import { SectionTitle } from '@/components/ui/section-title';
import { SessionStateApi } from '@/lib/api';
import { Stack } from '@chakra-ui/react';
import { headers } from 'next/headers';

export default async function ChatPage({}: PageProps<'/my-space'>) {
	const requestHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: requestHeaders });
	if (!sessionState) return null;

	return (
		<Stack height={'full'} justify={'space-between'} divideY={'1px'} gap={0}>
			<SectionTitle title="AI Assistant" description="Ask AI to tune your resume" padding={4} />
			<Stack height={'full'} overflowY={'scroll'} padding={4}>
				<ChatConversation sessionState={sessionState} />
			</Stack>
			<ChatInput sessionState={sessionState} />
		</Stack>
	);
}
