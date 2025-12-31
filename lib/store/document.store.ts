'use client';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { DocumentData } from '@/lib/api/types.gen';
import { createEncryptedStorage } from './utils';

type LoadingState = 'uploading' | 'parsing' | 'extracting' | 'saving' | 'none';

interface FormData {
	file: File | null;
	jobDescription: string;
	input: string;
}

export interface PdfStore {
	formData: FormData;
	isLoading: boolean;
	resumeData: DocumentData | null;
	loadingState: LoadingState;
	setFormData: (formData: Partial<FormData>) => void;
	setIsLoading: (isLoading: boolean) => void;
	setLoadingState: (loadingState: LoadingState) => void;
	setResumeData: (resumeData: DocumentData) => void;
	clearFormData: () => void;
	clearResumeData: () => void;
}

export const useDocumentStore = create<PdfStore>()(
	devtools(
		persist(
			(set) => ({
				isLoading: false,
				resumeData: null,
				loadingState: 'none',
				formData: { file: null, jobDescription: '', input: '' },
				setIsLoading: (isLoading: boolean) => set({ isLoading }),
				setFormData: (formData: Partial<FormData>) => set((state) => ({ formData: { ...state.formData, ...formData } as FormData })),
				setLoadingState: (loadingState: LoadingState) => set({ loadingState: loadingState, isLoading: loadingState !== 'none' }),
				setResumeData: (resumeData: DocumentData) => set({ resumeData }),
				clearFormData: () => set({ formData: { file: null, jobDescription: '', input: '' } }),
				clearResumeData: () => set({ resumeData: null }),
			}),
			{
				name: 'resumevx-document-store',
				storage: createJSONStorage(() => createEncryptedStorage()),
			},
		),
	),
);
