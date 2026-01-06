'use client';
import { FC, useState } from 'react';
import { Button, Input, InputGroup, Stack, StackProps } from '@chakra-ui/react';
import { LuMessageCircle, LuZap } from 'react-icons/lu';
import { useMutation } from '@tanstack/react-query';
import { rewriteDocumentMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useChatStore } from '@/lib/store/chat.store';
import { useDocumentStore } from '@/lib/store/document.store';
import { DocumentDataOutput, SessionState } from '@/lib/api/types.gen';
import { toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';

interface ChatInputProps extends StackProps {
	sessionState: SessionState;
}

export const ChatInput: FC<ChatInputProps> = ({ sessionState, ...props }) => {
	const router = useRouter();
	const [input, setInput] = useState('');
	const { addMessage, setSubmitting, isSubmitting } = useChatStore();
	const { setResumeData } = useDocumentStore();
	const successMessage = 'Resume has been updated successfully! The changes have been applied to your resume.';
	const errorMessage = 'Sorry, something went wrong while processing your request. Please try again later.';
	const { mutate: rewriteDocument } = useMutation({ ...rewriteDocumentMutation(), onSuccess: onSuccess, onError: (error) => onError(error as Error) });

	function onSuccess({ summary, data }: DocumentDataOutput) {
		setSubmitting(false);
		setResumeData(data);
		addMessage({ role: 'assistant', content: summary ?? successMessage });
		router.refresh();
	}

	function onError(error: Error) {
		setSubmitting(false);
		addMessage({ role: 'assistant', content: error instanceof Error ? error.message : errorMessage });
	}

	function showToaster() {
		toaster.error({
			title: 'No resume found',
			description: 'Please upload a resume to continue',
			closable: true,
		});
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const jobDescription = sessionState.jobDescription ?? '';
		if (!sessionState.documentData) return showToaster();
		addMessage({ role: 'user', content: input });
		setSubmitting(true);
		setInput('');
		rewriteDocument({ body: { inputMessage: input, jobRequirement: jobDescription, resumeContent: JSON.stringify(sessionState.documentData) } });
	}

	return (
		<Stack padding={4} gap={4} {...props} asChild>
			<form onSubmit={onSubmit}>
				<InputGroup flex="1" startElement={<LuMessageCircle />}>
					<Input
						name="input"
						value={input}
						variant={'subtle'}
						size={'xl'}
						placeholder="Say something..."
						border={'1px solid'}
						borderColor={'border.emphasized'}
						onChange={(e) => setInput(e.target.value)}
						disabled={!sessionState.jobDescription}
					/>
				</InputGroup>
				<Button
					type="submit"
					variant={'solid'}
					colorPalette={'blue'}
					width={'full'}
					size={'xl'}
					rounded={'lg'}
					disabled={!sessionState.jobDescription || input.trim() === ''}
					loading={isSubmitting}
				>
					<LuZap />
					Send message
				</Button>
			</form>
		</Stack>
	);
};
