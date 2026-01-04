import { headers } from 'next/headers';
import { SessionStateApi } from '@/lib/api';
import { Stack } from '@chakra-ui/react';
import { ChatHeader } from '@/components/dashboard/chat-and-preview/chat/chat-widget/chat-header';
import { ChatConversation } from '@/components/dashboard/chat-and-preview/chat/chat-widget/chat-conversation';
import { ChatInput } from '@/components/dashboard/chat-and-preview/chat/chat-widget/chat-input';

export async function ChatComponent() {
	const nextHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: nextHeaders });
	if (!sessionState) return null;

	return (
		<Stack height={'full'} divideY={'1px'} justify={'space-between'} gap={0}>
			<ChatHeader />
			<ChatConversation />
			<ChatInput sessionState={sessionState} />
		</Stack>
	);
}
