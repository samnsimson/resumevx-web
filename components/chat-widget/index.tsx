'use client';
import { FC } from 'react';
import { Stack, StackProps } from '@chakra-ui/react';
import { LuSparkle } from 'react-icons/lu';
import { ChatInput } from '@/components/chat-widget/chat-input';
import { ChatConversation } from '@/components/chat-widget/chat-conversation';
import { AppCard } from '../ui/app-card';

interface ChatWidgetProps extends StackProps {
	[x: string]: unknown;
}

export const ChatWidget: FC<ChatWidgetProps> = ({ ...props }) => {
	return (
		<AppCard title="AI Assist" description="Chat with AI to refine your results" icon={LuSparkle} height={'full'} flex={1} {...props}>
			<Stack gap={4} width={'full'} height={'full'} minHeight={0}>
				<ChatConversation />
				<ChatInput />
			</Stack>
		</AppCard>
	);
};
