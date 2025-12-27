'use client';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { DocumentData } from '@/lib/api/types.gen';
import { createEncryptedStorage } from './utils';

type LoadingState = 'uploading' | 'parsing' | 'extracting' | 'none';

interface FileData {
	file: File | null;
}

export interface PdfStore {
	fileData: FileData | null;
	isLoading: boolean;
	resumeData: DocumentData | null;
	loadingState: LoadingState;
	setFileData: (file: File) => void;
	setIsLoading: (isLoading: boolean) => void;
	setLoadingState: (loadingState: LoadingState) => void;
	setResumeData: (resumeData: DocumentData) => void;
	clearFileData: () => void;
	clearResumeData: () => void;
}

export const useDocumentStore = create<PdfStore>()(
	devtools(
		persist(
			(set) => ({
				fileData: null,
				isLoading: false,
				resumeData: null,
				loadingState: 'none',
				parsedData: null,
				setFileData: (file: File) => set({ fileData: { file } }),
				setIsLoading: (isLoading: boolean) => set({ isLoading }),
				setLoadingState: (loadingState: LoadingState) => set({ loadingState }),
				setResumeData: (resumeData: DocumentData) => set({ resumeData }),
				clearFileData: () => set({ fileData: null }),
				clearResumeData: () => set({ resumeData: null }),
			}),
			{
				name: 'resumevx-document-store',
				storage: createJSONStorage(() => createEncryptedStorage()),
			},
		),
	),
);
