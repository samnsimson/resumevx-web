/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { FC, Fragment, useState } from 'react';
import { Button, ButtonProps, Dialog } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi2';
import { useDataInputForm } from '@/lib/hooks/useDataInputForm';
import { useDocumentStore } from '@/lib/store/document.store';
import { useRouter } from 'next/navigation';
import { extractDocumentMutation, parseDocumentMutation, saveSessionStateMutation, uploadDocumentMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useMutation } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { ProgressIndicator } from '@/components/file-upload/progress-indicator';

interface ContinueButtonProps extends ButtonProps {
	[x: string]: any;
}

export function ContinueButton({ ...props }: ContinueButtonProps) {
	const router = useRouter();
	const { form } = useDataInputForm();
	const { formData, setResumeData, setLoadingState } = useDocumentStore((state) => state);
	const jobDescription = form?.watch('jobDescription');
	const isDisabled = !form || !formData || !jobDescription || !formData.file;
	const [openDialog, setOpenDialog] = useState(false);
	const { mutateAsync: uploadDocument } = useMutation({ ...uploadDocumentMutation() });
	const { mutateAsync: parseDocument } = useMutation({ ...parseDocumentMutation() });
	const { mutateAsync: extractDocument } = useMutation({ ...extractDocumentMutation() });
	const { mutateAsync: saveSessionState } = useMutation({ ...saveSessionStateMutation() });

	const uploadFile = async (file: File) => {
		setLoadingState('uploading');
		const result = await uploadDocument({ body: { file } });
		if (!result) throw new Error('Failed to upload file');
		return result;
	};

	const saveJobDescription = async (jobDescription: string) => {
		setLoadingState('saving');
		const result = await saveSessionState({ body: { jobDescription } });
		if (!result) throw new Error('Failed to save job description');
		return result;
	};

	const parseFile = async (file: File) => {
		setLoadingState('parsing');
		const result = await parseDocument({ body: { file } });
		if (!result) throw new Error('Failed to parse file');
		return result;
	};

	const extractFile = async (content: string) => {
		setLoadingState('extracting');
		const result = await extractDocument({ body: { fileContent: content } });
		if (!result) throw new Error('Failed to extract file');
		return result;
	};

	const handleContinue = async () => {
		try {
			if (!form || !formData) return;
			const jobDescription = form.getValues('jobDescription');
			if (!jobDescription || !formData.file) return;
			setOpenDialog(true);
			const uploadedDocument = await uploadFile(formData.file);
			const sessionState = await saveJobDescription(jobDescription);
			const parsedDocument = await parseFile(formData.file);
			const extractedDocument = await extractFile(parsedDocument);
			setResumeData(extractedDocument);
			router.refresh();
		} catch (error: any) {
			console.error(error);
			const errorMessage = error.message || 'Failed to continue';
			toaster.error({ title: 'Error', description: errorMessage, closable: true });
		} finally {
			setLoadingState('none');
			setOpenDialog(false);
		}
	};

	return (
		<Fragment>
			<Button variant={'solid'} colorPalette={'blue'} size={'xl'} rounded={'full'} disabled={isDisabled} onClick={handleContinue} {...props}>
				Save and Continue
				<HiArrowRight />
			</Button>
			<Dialog.Root open={openDialog} placement={'center'} size={'xs'}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Body>
							<ProgressIndicator />
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</Fragment>
	);
}
