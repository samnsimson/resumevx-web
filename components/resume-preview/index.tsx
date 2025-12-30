'use client';
import { FC } from 'react';
import { Show, Stack, StackProps } from '@chakra-ui/react';
import { LuZap } from 'react-icons/lu';
import { useDocumentStore } from '@/lib/store/document.store';
import { NoDataPlaceholder } from './no-data-palceholder';
import { PdfRenderer } from '@/components/resume-preview/pdf-renderer';
import { AppCard } from '@/components/ui/app-card';
import { PDFViewer } from '@react-pdf/renderer';
import { DownloadPdfButton } from './download-pdf-button';

interface ResumePreviewProps extends StackProps {
	activeDocumentPath: string | null;
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
			body={{ padding: 0 }}
			actions={<DownloadPdfButton />}
			{...props}
		>
			<Stack flex={1} minHeight={0} bg={'bg.muted'} rounded={'lg'} border={'1px solid'} borderColor={'border.emphasized'} padding={0}>
				<Show when={!resumeData}>
					<NoDataPlaceholder />
				</Show>
				<Show when={resumeData}>
					{(resume) => (
						<PDFViewer height={'100%'} width={'100%'} showToolbar={false}>
							<PdfRenderer data={resume} />
						</PDFViewer>
					)}
				</Show>
			</Stack>
		</AppCard>
	);
};
