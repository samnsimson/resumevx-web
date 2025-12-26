'use client';
import { useAppStore } from '@/lib/store/app.store';
import { queryClient } from '@/lib/tanstack/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';
import { QueryClientProvider } from '@tanstack/react-query';

export function Provider(props: ThemeProviderProps) {
	const { colorMode } = useAppStore((state) => state);

	return (
		<ChakraProvider value={defaultSystem}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider enableSystem forcedTheme={colorMode} attribute="class" disableTransitionOnChange storageKey="color-mode" {...props} />
			</QueryClientProvider>
		</ChakraProvider>
	);
}
