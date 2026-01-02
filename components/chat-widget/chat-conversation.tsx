'use client';
import { FC, useEffect, useRef } from 'react';
import { Box, For, HStack, Icon, Show, Stack, StackProps, Text } from '@chakra-ui/react';
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
		<Stack overflow={'scroll'} padding={4} {...props}>
			<Stack gap={4}>
				<Show when={messages.length > 0} fallback={ChatEmptyState()}>
					<For each={messages}>
						{(message) => {
							const isUser = message.role === 'user';
							return (
								<HStack key={message.id} align={'start'} justify={isUser ? 'flex-end' : 'flex-start'} gap={3}>
									<Show when={message.role === 'assistant'}>
										<Icon as={LuBot} size={'lg'} color={'green.600'} />
									</Show>
									<Box
										maxWidth={'80%'}
										padding={3}
										rounded={'lg'}
										bgColor={isUser ? 'blue.subtle' : 'bg.muted'}
										color={isUser ? 'fg' : 'fg.default'}
									>
										<Text fontSize={'sm'} whiteSpace={'pre-wrap'}>
											{message.content}
										</Text>
									</Box>
									<Show when={message.role === 'user'}>
										<Icon as={HiUser} size={'lg'} color={'blue.600'} />
									</Show>
								</HStack>
							);
						}}
					</For>
				</Show>
			</Stack>
		</Stack>
	);
};
