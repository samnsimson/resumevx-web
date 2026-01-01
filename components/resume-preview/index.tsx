'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { HStack, Icon, IconButton, Show, Stack, StackProps } from '@chakra-ui/react';
import { LuZap } from 'react-icons/lu';
import { NoDataPlaceholder } from './no-data-palceholder';
import { AppCard } from '@/components/ui/app-card';
import { DownloadPdfButton } from './download-pdf-button';
import { HiOutlineBookmark } from 'react-icons/hi2';

const PdfViewer = dynamic(() => import('./pdf-viewer').then((mod) => ({ default: mod.PdfViewer })), { ssr: false });
interface ResumePreviewProps extends StackProps {
	document: Blob | null;
}

export const ActionButtons = () => {
	return (
		<HStack>
			<IconButton colorPalette="blue" variant="ghost" size="sm" rounded="full">
				<Icon as={HiOutlineBookmark} />
			</IconButton>
			<DownloadPdfButton />
		</HStack>
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
			body={{ overflow: 'hidden', bg: 'bg.subtle' }}
			{...props}
		>
			<Stack flex={1} minHeight={0} height={'full'} rounded={'lg'} overflowY={'auto'} overflowX={'hidden'}>
				<Show when={document} fallback={NoDataPlaceholder()}>
					{(document) => <PdfViewer blob={document} />}
				</Show>
			</Stack>
		</AppCard>
	);
};
