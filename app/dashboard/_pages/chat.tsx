import { ChatConversation } from '@/components/chat-widget/chat-conversation';
import { ChatHeader } from '@/components/chat-widget/chat-header';
import { ChatInput } from '@/components/chat-widget/chat-input';
import { SessionState } from '@/lib/api';
import { Stack } from '@chakra-ui/react';

interface ChatPageProps {
	sessionState?: SessionState | null;
}

export async function ChatPage({ sessionState }: ChatPageProps) {
	if (!sessionState) return null;

	return (
		<Stack height={'full'} divideY={'1px'} justify={'space-between'} gap={0}>
			<ChatHeader />
			<ChatConversation />
			<ChatInput sessionState={sessionState} />
		</Stack>
	);
}
