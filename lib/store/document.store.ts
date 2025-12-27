'use client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UploadDocumentResult, DocumentData } from '@/lib/api/types.gen';
import { createEncryptedStorage } from './utils';

interface FileData extends UploadDocumentResult {
	file: File | null;
}

export interface PdfStore {
	fileData: FileData | null;
	isLoading: boolean;
	resumeData: DocumentData | null;
	loadingState: 'uploading' | 'parsing' | 'none';
	parsedData: string | null;
	setFileData: (fileData: FileData) => void;
	setIsLoading: (isLoading: boolean) => void;
	setLoadingState: (loadingState: 'uploading' | 'parsing' | 'none') => void;
	setResumeData: (resumeData: DocumentData) => void;
	setParsedData: (parsedData: string) => void;
	clearFileData: () => void;
	clearResumeData: () => void;
}

export const useDocumentStore = create<PdfStore>()(
	persist(
		(set) => ({
			fileData: null,
			isLoading: false,
			resumeData: null,
			loadingState: 'none',
			parsedData: null,
			setFileData: (fileData: FileData) => set({ fileData }),
			setIsLoading: (isLoading: boolean) => set({ isLoading }),
			setLoadingState: (loadingState: 'uploading' | 'parsing' | 'none') => set({ loadingState }),
			setResumeData: (resumeData: DocumentData) => set({ resumeData }),
			setParsedData: (parsedData: string) => set({ parsedData }),
			clearFileData: () => set({ fileData: null }),
			clearResumeData: () => set({ resumeData: null }),
		}),
		{
			name: 'resumevx-document-store',
			storage: createJSONStorage(() => createEncryptedStorage()),
		},
	),
);
