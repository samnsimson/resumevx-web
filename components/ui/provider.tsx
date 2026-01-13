'use client';
import { useAppStore } from '@/lib/store/app.store';
import { queryClient } from '@/lib/tanstack/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@/lib/config/theme.config';

export function Provider(props: ThemeProviderProps) {
	const { colorMode } = useAppStore((state) => state);

	return (
		<ChakraProvider value={theme}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider enableSystem forcedTheme={colorMode} attribute="class" disableTransitionOnChange storageKey="color-mode" {...props} />
			</QueryClientProvider>
		</ChakraProvider>
	);
}
