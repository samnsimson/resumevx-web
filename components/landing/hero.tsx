'use client';
import { Box, Button, Container, Flex, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuPlay, LuUpload, LuMessageSquare } from 'react-icons/lu';
import { Card } from '@chakra-ui/react';

export function Hero() {
	return (
		<Container maxW="container.xl" py={20}>
			<SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="center">
				{/* Left: Text Content */}
				<VStack align={{ base: 'center', lg: 'start' }} gap={6} textAlign={{ base: 'center', lg: 'left' }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<Heading size="4xl" fontWeight="bold" lineHeight="1.1" color="white" mb={4}>
							Craft the perfect resume for your dream job with{' '}
							<Box as="span" bgGradient="linear(to-r, purple.400, pink.400)" bgClip="text">
								AI
							</Box>
						</Heading>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
						<Text fontSize="xl" color="gray.400" maxW="2xl">
							Upload your resume and job description to get an ATS-optimized match in seconds. Let AI fine-tune every detail for maximum impact.
						</Text>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
						<HStack gap={4} flexWrap="wrap" justify={{ base: 'center', lg: 'start' }}>
							<Link href="/auth/register">
								<Button
									size="xl"
									bgGradient="linear(to-r, purple.500, pink.500)"
									color="white"
									_hover={{ bgGradient: 'linear(to-r, purple.600, pink.600)', transform: 'translateY(-2px)', boxShadow: 'xl' }}
									transition="all 0.2s"
								>
									Get Started for Free
								</Button>
							</Link>
							<Link href="#demo">
								<Button
									size="xl"
									variant="ghost"
									color="gray.400"
									leftIcon={<LuPlay />}
									_hover={{ color: 'white', bg: 'whiteAlpha.100' }}
									border="1px solid"
									borderColor="whiteAlpha.200"
								>
									Watch Demo
								</Button>
							</Link>
						</HStack>
					</motion.div>
				</VStack>

				{/* Right: Mockup UI */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<Box position="relative">
						{/* File Upload Zone */}
						<Card.Root
							bg="rgba(255, 255, 255, 0.05)"
							border="1px solid"
							borderColor="whiteAlpha.200"
							backdropFilter="blur(20px)"
							p={6}
							mb={4}
							borderRadius="xl"
						>
							<VStack gap={4}>
								<Box
									w="full"
									h="120px"
									border="2px dashed"
									borderColor="purple.500/30"
									borderRadius="lg"
									display="flex"
									alignItems="center"
									justifyContent="center"
									bg="purple.500/10"
								>
									<VStack gap={2}>
										<LuUpload size={32} color="#a78bfa" />
										<Text fontSize="sm" color="gray.400">
											Drop resume here
										</Text>
									</VStack>
								</Box>
							</VStack>
						</Card.Root>

						{/* Chat Interface */}
						<Card.Root
							bg="rgba(255, 255, 255, 0.05)"
							border="1px solid"
							borderColor="whiteAlpha.200"
							backdropFilter="blur(20px)"
							p={6}
							borderRadius="xl"
						>
							<VStack gap={4} align="stretch">
								<HStack justify="space-between">
									<Text fontSize="sm" fontWeight="semibold" color="white">
										AI Assistant
									</Text>
									<Box w={2} h={2} bg="green.400" borderRadius="full" />
								</HStack>
								<Box
									bg="whiteAlpha.50"
									borderRadius="lg"
									p={3}
									border="1px solid"
									borderColor="whiteAlpha.100"
								>
									<Text fontSize="sm" color="gray.300">
										I've optimized your resume to match the job description. Here are the key improvements...
									</Text>
								</Box>
								<HStack gap={2}>
									<Box flex={1} h="40px" bg="whiteAlpha.100" borderRadius="md" />
									<Box
										w="40px"
										h="40px"
										bgGradient="linear(to-r, purple.500, pink.500)"
										borderRadius="md"
										display="flex"
										alignItems="center"
										justifyContent="center"
									>
										<LuMessageSquare size={20} color="white" />
									</Box>
								</HStack>
							</VStack>
						</Card.Root>
					</Box>
				</motion.div>
			</SimpleGrid>
		</Container>
	);
}

