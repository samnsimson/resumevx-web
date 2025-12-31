'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { HStack, Icon, IconButton, Show, Stack, StackProps } from '@chakra-ui/react';
import { LuZap } from 'react-icons/lu';
import { NoDataPlaceholder } from './no-data-palceholder';
import { AppCard } from '@/components/ui/app-card';
import { DownloadPdfButton } from './download-pdf-button';
import { SessionState } from '@/lib/api/types.gen';
import { HiOutlineBookmark } from 'react-icons/hi2';

const PdfViewer = dynamic(() => import('./pdf-viewer').then((mod) => ({ default: mod.PdfViewer })), { ssr: false });
interface ResumePreviewProps extends StackProps {
	sessionState: SessionState;
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

export const ResumePreview: FC<ResumePreviewProps> = ({ sessionState, ...props }) => {
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
				<Show when={!sessionState.documentData}>
					<NoDataPlaceholder />
				</Show>
				<Show when={sessionState.documentUrl}>{(documentUrl) => <PdfViewer url={documentUrl} />}</Show>
			</Stack>
		</AppCard>
	);
};

{
	/* {(resume) => (
						<BlobProvider document={createElement(PdfRenderer, { data: resume })}>{({ url }) => }</BlobProvider>
					)} */
}
