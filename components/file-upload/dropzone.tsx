'use client';
import { useDocumentStore } from '@/lib/store/document.store';
import { FileUpload, Icon, Box, FileUploadDropzoneProps } from '@chakra-ui/react';
import { FC } from 'react';
import { LuCheckCheck, LuUpload } from 'react-icons/lu';

interface ResumeDropZoneProps extends FileUploadDropzoneProps {
	[x: string]: unknown;
}

export const ResumeDropZone: FC<ResumeDropZoneProps> = ({ ...props }) => {
	const { fileData } = useDocumentStore((state) => state);
	return (
		<FileUpload.Dropzone background={fileData ? 'bg.panel' : 'bg.muted'} rounded={'lg'} {...props}>
			<Icon size="md" color="fg.muted">
				{fileData ? <LuCheckCheck color="green" /> : <LuUpload />}
			</Icon>
			<FileUpload.DropzoneContent>
				<Box>{fileData ? 'Resume uploaded' : 'Drag and drop files here'}</Box>
				<Box color="fg.muted">{fileData ? 'Remove it to upload a new one' : '.png, .jpg up to 5MB'}</Box>
			</FileUpload.DropzoneContent>
		</FileUpload.Dropzone>
	);
};
