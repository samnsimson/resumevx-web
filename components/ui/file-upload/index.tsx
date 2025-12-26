'use client';
import { FC } from 'react';
import { Box, FileUpload, FileUploadFileAcceptDetails, StackProps, VStack } from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import { UploadList } from './upload-list';
import { SectionTitle } from '../section-title';
import { ResumeDropZone } from './dropzone';
import { useDocumentStore } from '@/lib/store/document.store';
import { useMutation } from '@tanstack/react-query';
import { parseDocumentMutation, uploadDocumentMutation } from '@/lib/api/@tanstack/react-query.gen';

interface ResumeUploadProps extends StackProps {
	activeDocumentPath: string | null;
}

export const ResumeUpload: FC<ResumeUploadProps> = ({ ...props }) => {
	const { fileData, setFileData, setIsLoading, setLoadingState, setParsedData } = useDocumentStore((state) => state);
	const { mutateAsync: uploadDocument } = useMutation({ ...uploadDocumentMutation() });
	const { mutateAsync: parseDocument } = useMutation({ ...parseDocumentMutation() });

	const handleFileAccept = async (details: FileUploadFileAcceptDetails) => {
		try {
			setIsLoading(true);
			setLoadingState('uploading');
			const file = details.files[0] as unknown as File;
			const data = await uploadDocument({ body: { file } });
			setLoadingState('parsing');
			const parsedData = await parseDocument({ query: { file_key: data.fileKey } });
			if (parsedData) setParsedData(parsedData);
			if (data) setFileData({ ...data, file });
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
			setLoadingState('none');
		}
	};

	return (
		<VStack width={'full'} align={'start'} {...props}>
			<SectionTitle title="Upload your resume" description=" Upload your resume to be parsed for use" icon={LuUpload} />
			<Box width={'full'} flex={'1'} minHeight={0} overflow={'auto'}>
				<FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1} height={'full'} onFileAccept={handleFileAccept}>
					<FileUpload.HiddenInput disabled={!!fileData} />
					<ResumeDropZone />
					<UploadList />
				</FileUpload.Root>
			</Box>
		</VStack>
	);
};
