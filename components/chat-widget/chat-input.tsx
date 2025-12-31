'use client';
import { Button, Field, HStack, Input, InputGroup, Kbd, StackProps, Textarea, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { LuMessageCircle, LuZap } from 'react-icons/lu';
import { useWorkspaceForm } from '@/lib/hooks/useWorkspaceForm';
import { WorkspaceSchema } from '@/lib/types';
import { Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { rewriteDocumentMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useChatStore } from '@/lib/store/chat.store';
import { useDocumentStore } from '@/lib/store/document.store';
import { DocumentDataOutput } from '@/lib/api/types.gen';
import { toaster } from '../ui/toaster';

interface ChatInputProps extends StackProps {
	[x: string]: unknown;
}

export const ChatInput: FC<ChatInputProps> = ({ ...props }) => {
	const { form } = useWorkspaceForm();
	const { addMessage, setSubmitting, isSubmitting } = useChatStore();
	const { resumeData, setResumeData } = useDocumentStore();
	const successMessage = 'Resume has been updated successfully! The changes have been applied to your resume.';
	const errorMessage = 'An error occurred while rewriting the document';
	const { mutate: rewriteDocument } = useMutation({
		...rewriteDocumentMutation(),
		onSuccess: (data) => onSuccess(data),
		onError: (error) => onError(error as Error),
	});

	function onSuccess({ summary, data }: DocumentDataOutput) {
		setSubmitting(false);
		setResumeData(data);
		addMessage({ role: 'assistant', content: summary ?? successMessage });
	}

	function onError(error: Error) {
		setSubmitting(false);
		addMessage({ role: 'assistant', content: error instanceof Error ? error.message : errorMessage });
	}

	async function onSubmit({ input, jobDescription }: WorkspaceSchema) {
		if (!resumeData) return toaster.error({ title: 'No resume found', description: 'Please upload a resume to continue', closable: true });
		addMessage({ role: 'user', content: input });
		setSubmitting(true);
		form?.reset({ ...form.getValues(), input: '' });
		rewriteDocument({ body: { inputMessage: input, jobRequirement: jobDescription, resumeContent: JSON.stringify(resumeData) } });
	}

	if (!form) return null;

	return (
		<VStack width={'full'} gap={4} flexShrink={0} {...props} asChild>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<HStack width={'full'} gap={4}>
					<Controller
						control={form.control}
						name="input"
						render={({ field }) => (
							<Field.Root required invalid={!!form.formState.errors.input}>
								<InputGroup flex="1" startElement={<LuMessageCircle />}>
									<Input
										variant={'subtle'}
										size={'xl'}
										placeholder="Say something..."
										border={'1px solid'}
										borderColor={'border.emphasized'}
										{...field}
									/>
								</InputGroup>
								<Field.ErrorText>{form.formState.errors.input?.message}</Field.ErrorText>
							</Field.Root>
						)}
					/>
				</HStack>
				<Button
					type="submit"
					variant={'solid'}
					colorPalette={'blue'}
					width={'full'}
					size={'xl'}
					rounded={'lg'}
					flexShrink={0}
					disabled={!form.formState.isValid}
					loading={form.formState.isSubmitting || isSubmitting}
				>
					<LuZap />
					Send message
				</Button>
			</form>
		</VStack>
	);
};
