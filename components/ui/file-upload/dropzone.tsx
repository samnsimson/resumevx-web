'use client';
import { usePdfStore } from '@/lib/store/pdf.store';
import { FileUpload, Icon, Box, FileUploadDropzoneProps } from '@chakra-ui/react';
import { FC } from 'react';
import { LuCheckCheck, LuUpload } from 'react-icons/lu';

interface ResumeDropZoneProps extends FileUploadDropzoneProps {
	[x: string]: unknown;
}

export const ResumeDropZone: FC<ResumeDropZoneProps> = ({ ...props }) => {
	const { pdf } = usePdfStore((state) => state);
	return (
		<FileUpload.Dropzone background={pdf ? 'bg.panel' : 'bg.muted'} rounded={'lg'} {...props}>
			<Icon size="md" color="fg.muted">
				{pdf ? <LuCheckCheck color="green" /> : <LuUpload />}
			</Icon>
			<FileUpload.DropzoneContent>
				<Box>{pdf ? 'Resume uploaded' : 'Drag and drop files here'}</Box>
				<Box color="fg.muted">{pdf ? 'Remove it to upload a new one' : '.png, .jpg up to 5MB'}</Box>
			</FileUpload.DropzoneContent>
		</FileUpload.Dropzone>
	);
};
