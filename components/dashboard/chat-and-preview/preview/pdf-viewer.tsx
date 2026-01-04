import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ErrorPlaceholder } from './ui/error-placeholder';
import { LoadingPlaceholder } from './ui/loading-placeholder';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Stack } from '@chakra-ui/react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
	blob: Blob;
}

export const PdfViewer: FC<PdfViewerProps> = ({ blob }) => {
	const [pdf, setPdf] = useState<any>(null);

	function onDocumentLoadSuccess(pdf: any): void {
		setPdf(pdf);
	}

	return (
		<Document file={blob} onLoadSuccess={onDocumentLoadSuccess} loading={LoadingPlaceholder()} error={ErrorPlaceholder()} className={'document-viewer'}>
			<Stack flex={1}>
				{Array.from(new Array(pdf ? pdf.numPages : 0), (el, index) => (
					<Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} width={undefined} />
				))}
			</Stack>
		</Document>
	);
};
