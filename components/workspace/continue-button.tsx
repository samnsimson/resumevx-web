/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { FC, Fragment, useState } from 'react';
import { Button, ButtonProps, Dialog } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi2';
import { useWorkspaceForm } from '@/lib/hooks/useWorkspaceForm';
import { useDocumentStore } from '@/lib/store/document.store';
import { useRouter } from 'next/navigation';
import { extractDocumentMutation, parseDocumentMutation, uploadDocumentMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useMutation } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { ProgressIndicator } from '@/components/file-upload/progress-indicator';

interface ContinueButtonProps extends ButtonProps {
	[x: string]: any;
}

export const ContinueButton: FC<ContinueButtonProps> = ({ ...props }) => {
	const router = useRouter();
	const { form } = useWorkspaceForm();
	const { formData, setResumeData, setLoadingState } = useDocumentStore((state) => state);
	const jobDescription = form?.watch('jobDescription');
	const isDisabled = !form || !formData || !jobDescription || !formData.file;
	const [openDialog, setOpenDialog] = useState(false);
	const { mutateAsync: uploadDocument } = useMutation({ ...uploadDocumentMutation() });
	const { mutateAsync: parseDocument } = useMutation({ ...parseDocumentMutation() });
	const { mutateAsync: extractDocument } = useMutation({ ...extractDocumentMutation() });

	const uploadFile = async (file: File) => {
		setLoadingState('uploading');
		const result = await uploadDocument({ body: { file } });
		if (!result) throw new Error('Failed to upload file');
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
			if (!form.getValues('jobDescription') || !formData.file) return;
			setOpenDialog(true);
			const uploadedDocument = await uploadFile(formData.file);
			const parsedDocument = await parseFile(formData.file);
			const extractedDocument = await extractFile(parsedDocument);
			setResumeData(extractedDocument);
			router.push('/workspace/assistant');
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
};
