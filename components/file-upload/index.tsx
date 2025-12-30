'use client';
import { FC } from 'react';
import { FileUpload, FileUploadFileAcceptDetails, StackProps } from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import { UploadList } from '@/components/file-upload/upload-list';
import { ResumeDropZone } from '@/components/file-upload/dropzone';
import { useDocumentStore } from '@/lib/store/document.store';
import { useMutation } from '@tanstack/react-query';
import { extractDocumentMutation, parseDocumentMutation } from '@/lib/api/@tanstack/react-query.gen';
import { toaster } from '@/components/ui/toaster';
import { AppCard } from '@/components/ui/app-card';

interface ResumeUploadProps extends StackProps {
	[x: string]: any;
}

export const ResumeUpload: FC<ResumeUploadProps> = () => {
	const { fileData, setFileData, setIsLoading, setLoadingState, setResumeData } = useDocumentStore((state) => state);
	const { mutateAsync: parseDocument } = useMutation({ ...parseDocumentMutation() });
	const { mutateAsync: extractDocument } = useMutation({ ...extractDocumentMutation() });

	const handleFileAccept = async (details: FileUploadFileAcceptDetails) => {
		try {
			setIsLoading(true);
			setLoadingState('uploading');
			const file = details.files[0] as unknown as File;

			setLoadingState('parsing');
			const parsedData = await parseDocument({ body: { file } });

			setLoadingState('extracting');
			const extractedData = await extractDocument({ body: { fileContent: parsedData } });

			setFileData(file);
			setResumeData(extractedData);
		} catch (error) {
			console.error(error);
			toaster.error({ title: 'Error', description: 'Failed to upload resume', closable: true });
		} finally {
			setIsLoading(false);
			setLoadingState('none');
		}
	};

	return (
		<AppCard title="Upload your resume" description=" Upload your resume to be parsed for use" icon={LuUpload}>
			<FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1} height={'full'} onFileAccept={handleFileAccept}>
				<FileUpload.HiddenInput disabled={!!fileData} />
				<ResumeDropZone />
				<UploadList />
			</FileUpload.Root>
		</AppCard>
	);
};
