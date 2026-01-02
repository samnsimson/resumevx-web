import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ErrorPlaceholder } from './error-placeholder';
import { LoadingPlaceholder } from './loading-placeholder';
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
			{/* <HStack align={'start'} width={'full'} gap={4}>
				<Show when={pdf}>
					{(pdf) => (
						<Stack width={'100px'}>
							{Array.from(new Array(pdf ? pdf.numPages : 0), (el, index) => (
								<Thumbnail key={index} pdf={pdf} pageNumber={index + 1} />
							))}
						</Stack>
					)}
				</Show>
				
			</HStack> */}
			<Stack flex={1}>
				{Array.from(new Array(pdf ? pdf.numPages : 0), (el, index) => (
					<Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} width={undefined} />
				))}
			</Stack>
		</Document>
	);
};
