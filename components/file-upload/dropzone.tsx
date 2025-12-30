'use client';
import { FileUpload, Icon, Box, FileUploadDropzoneProps, useFileUploadContext } from '@chakra-ui/react';
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
				{hasFiles ? <LuCheckCheck color="green" /> : <LuUpload />}
			</Icon>
			<FileUpload.DropzoneContent>
				<Box>{hasFiles ? 'Resume uploaded' : 'Drag and drop files here'}</Box>
				<Box color="fg.muted">{hasFiles ? 'Remove it to upload a new one' : 'Only PDF files are supported'}</Box>
			</FileUpload.DropzoneContent>
		</FileUpload.Dropzone>
	);
};
