'use client';
import { FC, useState } from 'react';
import { Document, Page, pdfjs, Outline } from 'react-pdf';
import { useDocumentStore } from '@/lib/store/document.store';
import { Box, Show, Spinner, StackProps, VStack } from '@chakra-ui/react';
import { PdfPagination } from './pdf-pagination';
import { NoDataPlaceholder } from '@/components/resume-preview/no-data-palceholder';
import { ErrorPlaceholder } from '@/components/resume-preview/error-placeholder';
import { Utils } from '@/lib/utils';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps extends StackProps {
	activeDocumentPath: string | null;
}

export const PDFViewer: FC<PDFViewerProps> = ({ activeDocumentPath, ...props }) => {
	const { pdf } = useDocumentStore((state) => state);
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset: number): void {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function goToPage(page: number): void {
		setPageNumber(page);
	}

	function onItemClick({ pageNumber: itemPageNumber }: { pageNumber: number }): void {
		setPageNumber(itemPageNumber);
	}

	return (
		<VStack height={'full'} width={'full'} justify={'space-between'} gap={0} {...props}>
			<Box flex={1} minHeight={0} overflow={'auto'} width={'full'}>
				<Document
					file={Utils.resumeUrl(activeDocumentPath) || pdf}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={<Spinner />}
					noData={<NoDataPlaceholder />}
					error={<ErrorPlaceholder />}
					className="document-class"
				>
					<Outline onItemClick={onItemClick} />
					<Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} />
				</Document>
			</Box>
			<Show when={!!(activeDocumentPath || pdf)}>
				<PdfPagination count={numPages} pageSize={1} defaultPage={pageNumber} changepage={changePage} goToPage={goToPage} paddingY={4} />
			</Show>
		</VStack>
	);
};
