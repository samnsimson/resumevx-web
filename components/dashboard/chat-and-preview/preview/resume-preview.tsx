'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Stack, StackProps } from '@chakra-ui/react';
import { PreviewSegemntSelector } from './ui/preview-segment-selector';

const PdfViewer = dynamic(() => import('./pdf-viewer').then((mod) => ({ default: mod.PdfViewer })), { ssr: false });
interface ResumePreviewProps extends StackProps {
	source: Blob | string;
}

export const ActionButtons = () => {
	return <PreviewSegemntSelector />;
};

export const ResumePreview: FC<ResumePreviewProps> = ({ source, ...props }) => {
	return (
		<Stack flex={1} minHeight={0} height={'full'} overflowY={'scroll'} {...props}>
			<PdfViewer source={source} />
		</Stack>
	);
};
