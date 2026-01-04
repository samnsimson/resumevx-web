'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Show, Stack, StackProps, Tabs } from '@chakra-ui/react';
import { LuZap } from 'react-icons/lu';
import { NoDataPlaceholder } from './ui/no-data-palceholder';
import { AppCard } from '@/components/ui/app-card';

const PdfViewer = dynamic(() => import('./pdf-viewer').then((mod) => ({ default: mod.PdfViewer })), { ssr: false });
interface ResumePreviewProps extends StackProps {
	document: Blob | null;
}

export const ActionButtons = () => {
	return (
		<Tabs.Root defaultValue="original" variant={'enclosed'} size={'sm'}>
			<Tabs.List rounded={'full'} border={'1px solid'} borderColor={'border.emphasized'}>
				<Tabs.Trigger value="original" rounded={'full'} _selected={{ bg: 'green.600', fontWeight: 'bold', color: 'white' }}>
					Original
				</Tabs.Trigger>
				<Tabs.Trigger value="generated" rounded={'full'} _selected={{ bg: 'green.600', fontWeight: 'bold', color: 'white' }}>
					Generated
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	);
};

export const ResumePreview: FC<ResumePreviewProps> = ({ document, ...props }) => {
	return (
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
				<Show when={document} fallback={NoDataPlaceholder()}>
					{(document) => <PdfViewer blob={document} />}
				</Show>
			</Stack>
		</AppCard>
	);
};
