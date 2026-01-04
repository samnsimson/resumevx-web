'use client';
import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ErrorPlaceholder } from './ui/error-placeholder';
import { LoadingPlaceholder } from './ui/loading-placeholder';
import { useAppStore } from '@/lib/store/app.store';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
	generatedBlob: Blob;
	originalUrl: string;
}

export const PdfViewer: FC<PdfViewerProps> = ({ generatedBlob, originalUrl }) => {
	const { previewTab } = useAppStore((state) => state);
	const [pdf, setPdf] = useState<any>(null);

	function onDocumentLoadSuccess(pdf: any): void {
		setTimeout(() => {
			setPdf(pdf);
		}, 2000);
	}

	return (
		<Document
			file={previewTab.toLowerCase() === 'original' ? originalUrl : generatedBlob}
			onLoadStart={() => setPdf(null)}
			onLoadSuccess={onDocumentLoadSuccess}
			loading={LoadingPlaceholder()}
			error={ErrorPlaceholder()}
			className={'document-viewer'}
		>
			{Array.from(new Array(pdf ? pdf.numPages : 0), (el, index) => (
				<Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} width={undefined} />
			))}
		</Document>
	);
};
