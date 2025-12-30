'use client';
import Link from 'next/link';
import { createElement, FC } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { PdfRenderer } from './pdf-renderer';
import { useDocumentStore } from '@/lib/store/document.store';
import { ButtonProps, Icon, IconButton } from '@chakra-ui/react';
import { LuDownload } from 'react-icons/lu';

interface DownloadPdfButtonProps extends ButtonProps {
	[x: string]: any;
}

export const DownloadPdfButton: FC<DownloadPdfButtonProps> = ({ ...props }) => {
	const { resumeData } = useDocumentStore((state) => state);

	if (!resumeData) return null;

	return (
		<BlobProvider document={createElement(PdfRenderer, { data: resumeData })}>
			{({ url }) => (
				<IconButton colorPalette="blue" variant="ghost" size="sm" rounded="full" asChild {...props}>
					<Link href={url ?? ''} target="_blank" download={'resume.pdf'}>
						<Icon as={LuDownload} />
					</Link>
				</IconButton>
			)}
		</BlobProvider>
	);
};
