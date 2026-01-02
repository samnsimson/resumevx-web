'use client';
import { FC, useEffect, useRef } from 'react';
import { Box, Flex, For, HStack, Show, Stack, StackProps, Text } from '@chakra-ui/react';
import { ChatEmptyState } from './chat-empty-state';
import { useChatStore } from '@/lib/store/chat.store';
import { HiUser } from 'react-icons/hi2';
import { LuBot } from 'react-icons/lu';

interface ChatConversationProps extends StackProps {
	[x: string]: any;
}

export const ChatConversation: FC<ChatConversationProps> = ({ ...props }) => {
	const { messages, isSubmitting } = useChatStore();
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [messages, isSubmitting]);

	return (
		<Stack height={'full'} {...props}>
			<Show when={messages.length > 0} fallback={ChatEmptyState()}>
				<For each={messages}>
					{(message) => (
						<HStack key={message.id} align={'start'} gap={3} justify={message.role === 'user' ? 'flex-end' : 'flex-start'}>
							<Show when={message.role === 'assistant'}>
								<Box padding={2} rounded={'full'} bgColor={'bg.emphasized'} color={'fg.muted'} flexShrink={0}>
									<LuBot size={16} />
								</Box>
							</Show>
							<Box
								maxWidth={'80%'}
								padding={3}
								rounded={'lg'}
								bgColor={message.role === 'user' ? 'blue.500' : 'bg.muted'}
								color={message.role === 'user' ? 'white' : 'fg.default'}
							>
								<Text fontSize={'sm'} whiteSpace={'pre-wrap'}>
									{message.content}
								</Text>
							</Box>
							<Show when={message.role === 'user'}>
								<Box padding={2} rounded={'full'} bgColor={'blue.500'} color={'white'} flexShrink={0}>
									<HiUser size={16} />
								</Box>
							</Show>
						</HStack>
					)}
				</For>
			</Show>
		</Stack>
	);
};
