'use client';
import { FC } from 'react';
import { Box, FileUpload, FileUploadFileAcceptDetails, StackProps, VStack } from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import { UploadList } from './upload-list';
import { SectionTitle } from '../section-title';
import { ResumeDropZone } from './dropzone';
import { usePdfStore } from '@/lib/store/pdf.store';
import { useMutation } from '@tanstack/react-query';
import { uploadDocumentMutation } from '@/lib/api/@tanstack/react-query.gen';

interface ResumeUploadProps extends StackProps {
	activeDocumentPath: string | null;
}

export const ResumeUpload: FC<ResumeUploadProps> = ({ ...props }) => {
	const { pdf, setPdf, setIsUploading } = usePdfStore((state) => state);
	const { mutateAsync: uploadDocument } = useMutation({
		...uploadDocumentMutation(),
		onMutate: () => setIsUploading(true),
		onSettled: () => setIsUploading(false),
	});

	const handleFileAccept = async (details: FileUploadFileAcceptDetails) => {
		const file = details.files[0] as unknown as File;
		const data = await uploadDocument({ body: { document: file } });
		if (data) setPdf(file);
	};

	return (
		<VStack width={'full'} align={'start'} {...props}>
			<SectionTitle title="Upload your resume" description=" Upload your resume to be parsed for use" icon={LuUpload} />
			<Box width={'full'} flex={'1'} minHeight={0} overflow={'auto'}>
				<FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1} height={'full'} onFileAccept={handleFileAccept}>
					<FileUpload.HiddenInput disabled={!!pdf} />
					<ResumeDropZone />
					<UploadList />
				</FileUpload.Root>
			</Box>
		</VStack>
	);
};
