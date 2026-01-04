'use client';
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export interface AppStoreState {
	colorMode: 'light' | 'dark';
	previewTab: string;
}

export interface AppStoreAction {
	toggleColorMode: () => void;
	setPreviewTab: (previewTab: string) => void;
}

export type AppStore = AppStoreState & AppStoreAction;

export const useAppStore = create<AppStore>()(
	devtools(
		persist(
			(set, get) => ({
				colorMode: 'light',
				previewTab: 'Original',
				setPreviewTab: (previewTab: string) => set({ previewTab }),
				toggleColorMode: () => {
					const { colorMode } = get();
					set({ colorMode: colorMode === 'light' ? 'dark' : 'light' });
				},
			}),
			{
				name: 'app-store',
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);
