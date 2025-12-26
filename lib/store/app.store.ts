'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AppStoreState {
	colorMode: 'light' | 'dark';
}

export interface AppStoreAction {
	toggleColorMode: () => void;
}

export type AppStore = AppStoreState & AppStoreAction;

export const useAppStore = create<AppStore>()(
	persist(
		(set, get) => ({
			colorMode: 'light',
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
);
