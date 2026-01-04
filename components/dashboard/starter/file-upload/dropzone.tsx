'use client';
import { FileUpload, Icon, FileUploadDropzoneProps, useFileUploadContext, Heading, Text, Show } from '@chakra-ui/react';
import { FC } from 'react';
import { LuCheckCheck, LuUpload } from 'react-icons/lu';

interface ResumeDropZoneProps extends FileUploadDropzoneProps {
	[x: string]: unknown;
}

export const ResumeDropZone: FC<ResumeDropZoneProps> = ({ ...props }) => {
	const fileUpload = useFileUploadContext();
	const files = fileUpload.acceptedFiles;
	const hasFiles = files.length > 0;
	return (
		<FileUpload.Dropzone background={hasFiles ? 'bg.panel' : 'bg.muted'} rounded={'lg'} boxSize={'full'} {...props}>
			<Icon size="md" color="fg.muted">
				<Show when={hasFiles} fallback={<Icon as={LuUpload} size={'lg'} color={'GrayText'} />}>
					<LuCheckCheck color="green" size={24} />
				</Show>
			</Icon>
			<FileUpload.DropzoneContent>
				<Heading size={'sm'}>{hasFiles ? 'Resume uploaded' : 'Drag and drop your resume here'}</Heading>
				<Text color="fg.muted">{hasFiles ? 'Remove it to upload a new one' : 'Only PDF files are supported'}</Text>
			</FileUpload.DropzoneContent>
		</FileUpload.Dropzone>
	);
};
