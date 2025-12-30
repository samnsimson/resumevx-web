'use client';
import { createElement, FC } from 'react';
import dynamic from 'next/dynamic';
import { Show, Stack, StackProps } from '@chakra-ui/react';
import { LuZap } from 'react-icons/lu';
import { useDocumentStore } from '@/lib/store/document.store';
import { NoDataPlaceholder } from './no-data-palceholder';
import { PdfRenderer } from '@/components/resume-preview/pdf-renderer';
import { AppCard } from '@/components/ui/app-card';
import { DownloadPdfButton } from './download-pdf-button';
import { BlobProvider } from '@react-pdf/renderer';

const PdfViewer = dynamic(() => import('./pdf-viewer').then((mod) => ({ default: mod.PdfViewer })), { ssr: false });
interface ResumePreviewProps extends StackProps {
	[x: string]: any;
}

export const ResumePreview: FC<ResumePreviewProps> = ({ ...props }) => {
	const { resumeData } = useDocumentStore((state) => state);
	return (
		<AppCard
			title="Preview"
			description="Preview of your result"
			icon={LuZap}
			height={'full'}
			flex={1}
			actions={<DownloadPdfButton />}
			body={{ overflow: 'hidden', bg: 'bg.subtle' }}
			{...props}
		>
			<Stack flex={1} minHeight={0} rounded={'lg'} overflow={'scroll'}>
				<Show when={!resumeData}>
					<NoDataPlaceholder />
				</Show>
				<Show when={resumeData}>
					{(resume) => (
						<BlobProvider document={createElement(PdfRenderer, { data: resume })}>{({ url }) => <PdfViewer url={url ?? ''} />}</BlobProvider>
					)}
				</Show>
			</Stack>
		</AppCard>
	);
};
