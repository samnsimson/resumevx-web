'use client';
import { useAppStore } from '@/lib/store/app.store';
import { ButtonProps, ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { ColorModeIcon } from './color-mode';

export const ColorModeButton = forwardRef<HTMLButtonElement, ButtonProps>(function ColorModeButton(props, ref) {
	const { toggleColorMode } = useAppStore((state) => state);
	return (
		<ClientOnly fallback={<Skeleton boxSize="9" />}>
			<IconButton
				onClick={toggleColorMode}
				variant="ghost"
				aria-label="Toggle color mode"
				size="sm"
				ref={ref}
				css={{ _icon: { width: '5', height: '5' } }}
				{...props}
			>
				<ColorModeIcon />
			</IconButton>
		</ClientOnly>
	);
});
