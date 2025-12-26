'use client';
import { FC } from 'react';
import { Stack, StackProps, VStack } from '@chakra-ui/react';
import { SectionTitle } from '@/components/ui/section-title';
import { LuSparkle } from 'react-icons/lu';
import { ChatInput } from '@/components/chat-widget/chat-input';
import { ChatConversation } from '@/components/chat-widget/chat-conversation';

interface ChatWidgetProps extends StackProps {
	[x: string]: unknown;
}

export const ChatWidget: FC<ChatWidgetProps> = ({ ...props }) => {
	return (
		<VStack height={'full'} width={'full'} {...props}>
			<SectionTitle title="AI Assist" description="Chat with AI to refine your results" icon={LuSparkle} />
			<Stack gap={4} width={'full'} height={'full'} minHeight={0}>
				<ChatConversation />
				<ChatInput />
			</Stack>
		</VStack>
	);
};
