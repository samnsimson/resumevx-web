'use client';
import { Fragment, useState } from 'react';
import { Button, ButtonProps, Dialog } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi2';
import { useDataInputForm } from '@/lib/hooks/useDataInputForm';
import { useDocumentStore } from '@/lib/store/document.store';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import { ProgressIndicator } from '@/components/file-upload/progress-indicator';
import { client } from '@/lib/api/client.gen';
import { formDataBodySerializer } from '@/lib/api/client';

interface ContinueButtonProps extends ButtonProps {
	[x: string]: any;
}

export function ContinueButton({ ...props }: ContinueButtonProps) {
	const router = useRouter();
	const { form } = useDataInputForm();
	const { formData, setLoadingState } = useDocumentStore((state) => state);
	const jobDescription = form?.watch('jobDescription');
	const isDisabled = !form || !formData || !jobDescription || !formData.file;
	const [openDialog, setOpenDialog] = useState(false);

	const validateFormData = (): boolean => {
		return !!(form && formData);
	};

	const getFormValues = (): { jobDescription: string; file: File } | null => {
		if (!form || !formData) return null;
		const jobDescription: string = form.getValues('jobDescription');
		if (!jobDescription || !formData.file) return null;
		return { jobDescription, file: formData.file };
	};

	const createFormDataBody = (jobDescription: string, file: File) => {
		return { file, job_description: jobDescription, template_name: 'default' };
	};

	const processStream = async (stream: AsyncIterable<any>) => {
		for await (const data of stream) {
			const status = (data as any).status;
			if (status === 'uploading') setLoadingState('uploading');
			else if (status === 'saving') setLoadingState('saving');
			else if (status === 'extracting') setLoadingState('extracting');
			else if (status === 'parsing') setLoadingState('parsing');
			else setLoadingState('none');
		}
	};

	const processInputData = async (formDataBody: { file: File; job_description: string; template_name: string }) => {
		return await client.sse.post({
			body: formDataBody,
			url: '/gateway/process-input-data',
			headers: { 'Content-Type': null },
			bodySerializer: formDataBodySerializer.bodySerializer,
			onSseError: (error: any) => {
				console.error('SSE Error:', error);
				const errorMessage = error.message || 'Failed to continue';
				toaster.error({ title: 'Error', description: errorMessage, closable: true });
			},
		});
	};

	const handleContinue = async () => {
		try {
			if (!validateFormData()) return;
			const formValues = getFormValues();
			if (!formValues) return;
			setOpenDialog(true);
			const formDataBody = createFormDataBody(formValues.jobDescription, formValues.file);
			const result = await processInputData(formDataBody);
			await processStream(result.stream);
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
