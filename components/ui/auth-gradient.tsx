'use client';
import { useColorModeValue } from '@/lib/hooks/useColorModeValue';
import { Box } from '@chakra-ui/react';

export function GradientBackground({ children }: { children: React.ReactNode }) {
	const bgColor = useColorModeValue('white', 'black');
	return (
		<Box position="relative" minH="100vh" w="full" bg={bgColor}>
			<Box
				position="absolute"
				inset={0}
				zIndex={0}
				background={`
                    radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
                    radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
                    radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
                    radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
                `}
			>
				<Pattern />
				{children}
			</Box>
		</Box>
	);
}

export function Pattern() {
	return (
		<Box
			position="absolute"
			inset={0}
			zIndex={0.5}
			background="transparent"
			backgroundImage="radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)"
			backgroundSize="20px 20px"
			opacity={0.6}
			pointerEvents="none"
		/>
	);
}
