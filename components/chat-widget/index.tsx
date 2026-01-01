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

export const ChatWidget: FC<ChatWidgetProps> = ({ sessionState, ...props }) => {
	return (
		<AppCard
			title="AI Assist"
			description="Chat with AI to refine your results"
			rounded={'none'}
			icon={LuSparkle}
			height={'full'}
			border={'none'}
			body={{ overflow: 'hidden', padding: 0 }}
			{...props}
		>
			<Stack gap={4} width={'full'} height={'full'} minHeight={0}>
				<ChatConversation flex={1} minHeight={0} sessionState={sessionState} />
				<ChatInput flexShrink={0} sessionState={sessionState} />
			</Stack>
		</AppCard>
	);
};
