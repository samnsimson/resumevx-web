'use client';
import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ErrorPlaceholder } from './ui/error-placeholder';
import { LoadingPlaceholder } from './ui/loading-placeholder';
import { Show } from '@chakra-ui/react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
	source: Blob | string;
}

export const PdfViewer: FC<PdfViewerProps> = ({ source }) => {
	const [pdf, setPdf] = useState<any>(null);

	return (
		<Document
			file={source}
			onLoadStart={() => setPdf(null)}
			onLoadSuccess={(pdf) => setPdf(pdf)}
			loading={LoadingPlaceholder()}
			error={ErrorPlaceholder()}
			className={'document-viewer'}
		>
			<Show when={pdf} fallback={<LoadingPlaceholder />}>
				{Array.from(new Array(pdf ? pdf.numPages : 0), (el, index) => (
					<Page
						className={'document-viewer-page'}
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						width={undefined}
						loading={null}
					/>
				))}
			</Show>
		</Document>
	);
};
