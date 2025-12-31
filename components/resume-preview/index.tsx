'use client';
import { createElement, FC } from 'react';
import dynamic from 'next/dynamic';
import { Show, Stack, StackProps } from '@chakra-ui/react';
import { LuZap } from 'react-icons/lu';
import { NoDataPlaceholder } from './no-data-palceholder';
import { PdfRenderer } from '@/components/resume-preview/pdf-renderer';
import { AppCard } from '@/components/ui/app-card';
import { DownloadPdfButton } from './download-pdf-button';
import { BlobProvider } from '@react-pdf/renderer';
import { SessionState } from '@/lib/api/types.gen';

const PdfViewer = dynamic(() => import('./pdf-viewer').then((mod) => ({ default: mod.PdfViewer })), { ssr: false });
interface ResumePreviewProps extends StackProps {
	sessionState: SessionState;
}

export const ResumePreview: FC<ResumePreviewProps> = ({ sessionState, ...props }) => {
	return (
		<AppCard
			title="Preview"
			description="Preview of your result"
			icon={LuZap}
			height={'full'}
			actions={<DownloadPdfButton />}
			body={{ overflow: 'hidden', bg: 'bg.subtle' }}
			{...props}
		>
			<Stack flex={1} minHeight={0} height={'full'} rounded={'lg'} overflowY={'auto'} overflowX={'hidden'}>
				<Show when={!sessionState.documentData}>
					<NoDataPlaceholder />
				</Show>
				<Show when={sessionState.documentData}>
					{(resume) => (
						<BlobProvider document={createElement(PdfRenderer, { data: resume })}>{({ url }) => <PdfViewer url={url ?? ''} />}</BlobProvider>
					)}
				</Show>
			</Stack>
		</AppCard>
	);
};
