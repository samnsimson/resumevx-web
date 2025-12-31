import { DocumentData } from '@/lib/api';
import { createElement } from 'react';

export const renderPdf = async (data: DocumentData) => {
	const { pdf } = await import('@react-pdf/renderer');
	const { PdfRenderer } = await import('@/components/resume-preview/pdf-renderer');
	const element = pdf(createElement(PdfRenderer, { data }));
	return element.toBlob();
};

export const cleanText = (text: string | null | undefined) => {
	if (!text) return null;
	return text.replace(/<[^>]*>?/g, '').trim();
};
