'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Stack, StackProps, Tabs } from '@chakra-ui/react';
import { LuZap } from 'react-icons/lu';
import { AppCard } from '@/components/ui/app-card';
import { useAppStore } from '@/lib/store/app.store';
import { PreviewSegemntSelector } from './ui/preview-segment-selector';

const PdfViewer = dynamic(() => import('./pdf-viewer').then((mod) => ({ default: mod.PdfViewer })), { ssr: false });
interface ResumePreviewProps extends StackProps {
	generatedBlob: Blob;
	originalUrl: string;
}

export const ActionButtons = () => {
	return <PreviewSegemntSelector />;
};

export const ResumePreview: FC<ResumePreviewProps> = ({ generatedBlob, originalUrl, ...props }) => {
	const { previewTab, setPreviewTab } = useAppStore((state) => state);
	return (
		<Tabs.Root defaultValue={previewTab} variant={'enclosed'} size={'sm'} onValueChange={(e) => setPreviewTab(e.value)}>
			<AppCard
				title="Preview"
				description="Preview of your result"
				icon={LuZap}
				height={'full'}
				actions={ActionButtons()}
				bodyStyle={{ bg: 'bg.muted', padding: 0 }}
				{...props}
			>
				<Stack flex={1} minHeight={0} height={'full'} overflowY={'scroll'}>
					<PdfViewer generatedBlob={generatedBlob} originalUrl={originalUrl} />
				</Stack>
			</AppCard>
		</Tabs.Root>
	);
};
