'use client';
import { FC, useEffect, useRef } from 'react';
import { Box, For, HStack, Icon, Show, Stack, StackProps, Text } from '@chakra-ui/react';
import { ChatEmptyState } from '@/components/dashboard/chat-and-preview/chat/chat-widget/chat-empty-state';
import { RenderMarkdown } from '@/components/dashboard/chat-and-preview/chat/chat-widget/render-markdown';
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
		<Stack ref={scrollRef} overflow={'scroll'} padding={4} boxSize={'full'} bg={'bg.subtle'} {...props}>
			<Stack gap={4} boxSize={'full'}>
				<Show when={messages.length > 0} fallback={ChatEmptyState()}>
					<For each={messages}>
						{(message) => {
							const isUser = message.role === 'user';
							return (
								<HStack key={message.id} align={'start'} justify={isUser ? 'end' : 'start'} gap={3} _last={{ paddingBottom: 4 }}>
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
										<Show when={isUser} fallback={<RenderMarkdown content={message.content} />}>
											<Text fontSize={'sm'} whiteSpace={'pre-wrap'}>
												{message.content}
											</Text>
										</Show>
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
