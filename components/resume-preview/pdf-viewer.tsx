import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
	url: string;
}

export const PdfViewer: FC<PdfViewerProps> = ({ url }) => {
	const [numPages, setNumPages] = useState<number>(0);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	return (
		<Document file={url} onLoadSuccess={onDocumentLoadSuccess} className={'document-viewer'}>
			{Array.from(new Array(numPages), (el, index) => (
				<Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} width={undefined} />
			))}
		</Document>
	);
};
