'use client';
import { useAppStore } from '@/lib/store/app.store';

export function useColorModeValue<T>(light: T, dark: T) {
	const { colorMode } = useAppStore((state) => state);
	return colorMode === 'light' ? light : dark;
}
