'use client';
import { FC } from 'react';
import { Stack, StackProps } from '@chakra-ui/react';
import { LuSparkle } from 'react-icons/lu';
import { ChatInput } from '@/components/chat-widget/chat-input';
import { ChatConversation } from '@/components/chat-widget/chat-conversation';
import { AppCard } from '@/components/ui/app-card';
import { SessionState } from '@/lib/api/types.gen';

interface ChatWidgetProps extends StackProps {
	sessionState: SessionState;
}

export const ChatWidget: FC<ChatWidgetProps> = ({ ...props }) => {
	return (
		<AppCard title="AI Assist" description="Chat with AI to refine your results" icon={LuSparkle} height={'full'} body={{ overflow: 'hidden' }} {...props}>
			<Stack gap={4} width={'full'} height={'full'} minHeight={0}>
				<ChatConversation flex={1} minHeight={0} />
				<ChatInput flexShrink={0} />
			</Stack>
		</AppCard>
	);
};
