'use client';
import { FC } from 'react';
import { CardRootProps, FileUpload, FileUploadFileAcceptDetails } from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import { UploadList } from '@/components/dashboard/starter/file-upload/upload-list';
import { useDocumentStore } from '@/lib/store/document.store';
import { toaster } from '@/components/ui/toaster';
import { AppCard } from '@/components/ui/app-card';
import { ResumeDropZone } from './dropzone';

interface ResumeUploadProps extends CardRootProps {
	[x: string]: any;
}

export const ResumeUpload: FC<ResumeUploadProps> = ({ ...props }) => {
	const { isLoading, setFormData, setIsLoading, setLoadingState } = useDocumentStore((state) => state);

	const handleFileAccept = async (details: FileUploadFileAcceptDetails) => {
		try {
			setIsLoading(true);
			setLoadingState('uploading');
			const file = details.files[0] as unknown as File;
			if (file) setFormData({ file });
		} catch (error) {
			console.error(error);
			toaster.error({ title: 'Error', description: 'Failed to upload resume', closable: true });
		} finally {
			setIsLoading(false);
			setLoadingState('none');
		}
	};

	return (
		<AppCard title="Upload resume" description=" Upload your resume to be parsed for use" icon={LuUpload} {...props}>
			<FileUpload.Root alignItems="stretch" maxFiles={1} height={'full'} accept={['application/pdf']} onFileAccept={handleFileAccept}>
				<FileUpload.HiddenInput />
				<ResumeDropZone />
				<UploadList isLoading={isLoading} />
			</FileUpload.Root>
		</AppCard>
	);
};
