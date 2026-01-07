'use client';
import { Box } from '@chakra-ui/react';
import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Stats } from '@/components/landing/stats';
import { Pricing } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';

export default function Home() {
	return (
		<Box minH="100vh" bg="#000000" color="white" position="relative" overflow="hidden">
			{/* Animated gradient background */}
			<Box
				position="absolute"
				top="0"
				left="0"
				right="0"
				bottom="0"
				background="radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.15) 0%, transparent 50%)"
				pointerEvents="none"
			/>

			{/* Grid pattern overlay */}
			<Box
				position="absolute"
				top="0"
				left="0"
				right="0"
				bottom="0"
				backgroundImage="radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px)"
				backgroundSize="50px 50px"
				pointerEvents="none"
			/>

			{/* Content */}
			<Box position="relative" zIndex={1}>
				<Navbar />
				<Hero />
				<Features />
				<Stats />
				<Pricing />
				<Footer />
			</Box>
		</Box>
	);
}
