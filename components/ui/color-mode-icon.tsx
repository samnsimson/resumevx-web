'use client';
import { useAppStore } from '@/lib/store/app.store';
import { LuMoon, LuSun } from 'react-icons/lu';

export function ColorModeIcon() {
	const { colorMode } = useAppStore((state) => state);
	return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
}
