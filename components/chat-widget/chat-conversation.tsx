'use client';
import { FC, useEffect, useRef } from 'react';
import { Box, For, HStack, Show, Stack, StackProps, Text } from '@chakra-ui/react';
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
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages, isSubmitting]);

	return (
		<Stack flex={1} minHeight={0} paddingY={4} overflow={'scroll'} {...props}>
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

{
	/*<Stack flex={1} minHeight={0} paddingX={3} overflow={'scroll'} {...props}>
			 {messages.length === 0 ? (
				<Center >
					<ChatEmptyState />
				</Center>
			) : (
				<VStack ref={scrollRef} flex={1} width={'full'} gap={3} overflowY={'auto'} align={'stretch'} padding={2}>
					{messages.map((message) => (
						<HStack key={message.id} align={'start'} gap={3} justify={message.role === 'user' ? 'flex-end' : 'flex-start'}>
							{message.role === 'assistant' && (
								<Box padding={2} rounded={'full'} bgColor={'bg.emphasized'} color={'fg.muted'} flexShrink={0}>
									<LuBot size={16} />
								</Box>
							)}
							<Box
								maxWidth={'80%'}
								padding={3}
								rounded={'lg'}
								bgColor={message.role === 'user' ? 'blue.500' : 'bg.emphasized'}
								color={message.role === 'user' ? 'white' : 'fg.default'}
							>
								<Text fontSize={'sm'} whiteSpace={'pre-wrap'}>
									{message.content}
								</Text>
							</Box>
							{message.role === 'user' && (
								<Box padding={2} rounded={'full'} bgColor={'blue.500'} color={'white'} flexShrink={0}>
									<HiUser size={16} />
								</Box>
							)}
						</HStack>
					))}
					{isSubmitting && (
						<HStack align={'start'} gap={3} justify={'flex-start'}>
							<Box padding={2} rounded={'full'} bgColor={'bg.emphasized'} color={'fg.muted'} flexShrink={0}>
								<LuBot size={16} />
							</Box>
							<Box maxWidth={'80%'} padding={3} rounded={'lg'} bgColor={'bg.emphasized'} color={'fg.default'}>
								<Text fontSize={'sm'} color={'fg.muted'}>
									Rewriting your resume. This may take a few seconds...
								</Text>
							</Box>
						</HStack>
					)}
				</VStack>
			)} 
			
		</Stack>*/
}
