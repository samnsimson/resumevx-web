'use client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { RewriteDocumentResponse } from '@/lib/api/types.gen';

export interface PdfStore {
	pdf: File | null;
	pdfName: string | null;
	isUploading: boolean;
	resume: Omit<RewriteDocumentResponse, 'summary'> | null;
	setPdf: (pdf: File) => void;
	setIsUploading: (isUploading: boolean) => void;
	setResume: (resume: Omit<RewriteDocumentResponse, 'summary'>) => void;
	clearPdf: () => void;
	clearResume: () => void;
}

export const usePdfStore = create<PdfStore>()(
	persist(
		(set) => ({
			pdf: null,
			pdfName: null,
			isUploading: false,
			resume: null,
			setPdf: (pdf: File) => set({ pdf, pdfName: pdf.name }),
			setIsUploading: (isUploading: boolean) => set({ isUploading }),
			setResume: (resume) => set({ resume }),
			clearPdf: () => set({ pdf: null, pdfName: null }),
			clearResume: () => set({ resume: null }),
		}),
		{
			name: 'pdf-store',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ pdfName: state.pdfName, resume: state.resume }),
		},
	),
);
