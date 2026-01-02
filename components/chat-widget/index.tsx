'use client';
import { FC } from 'react';
import { StackProps } from '@chakra-ui/react';
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
			border={'none'}
			bodyStyle={{ display: 'flex', divideY: '1px', padding: 0 }}
			{...props}
		>
			<ChatConversation sessionState={sessionState} padding={4} />
			<ChatInput sessionState={sessionState} padding={4} bg={'bg.panel'} />
		</AppCard>
	);
};
