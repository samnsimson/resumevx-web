'use client';
import { Box, Button, Container, Flex, HStack, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navbar() {
	return (
		<Box as="nav" position="sticky" top={0} zIndex={100} bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(20px)" borderBottom="1px solid" borderColor="whiteAlpha.100">
			<Container maxW="container.xl" py={4}>
				<Flex justify="space-between" align="center">
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<Heading size="xl" bgGradient="linear(to-r, purple.400, pink.400)" bgClip="text">
							ResumeVX
						</Heading>
					</motion.div>

					<HStack gap={8} display={{ base: 'none', md: 'flex' }}>
						<Link href="#features">
							<Button variant="ghost" size="sm" color="gray.400" _hover={{ color: 'white' }}>
								Features
							</Button>
						</Link>
						<Link href="#pricing">
							<Button variant="ghost" size="sm" color="gray.400" _hover={{ color: 'white' }}>
								Pricing
							</Button>
						</Link>
						<Link href="/auth/login">
							<Button variant="ghost" size="sm" color="gray.400" _hover={{ color: 'white' }}>
								Login
							</Button>
						</Link>
						<Link href="/auth/register">
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button
									size="sm"
									bg="transparent"
									border="1px solid"
									borderColor="transparent"
									backgroundImage="linear-gradient(#000, #000), linear-gradient(to right, #8b5cf6, #ec4899)"
									backgroundOrigin="border-box"
									backgroundClip="padding-box, border-box"
									color="white"
									_hover={{ borderColor: 'transparent', opacity: 0.9 }}
								>
									Get Started
								</Button>
							</motion.div>
						</Link>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
}

