'use client';
import { Box, Button, Container, Heading, HStack, Text, VStack, List } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuCheck } from 'react-icons/lu';
import { Card } from '@chakra-ui/react';

const features = ['Unlimited rewrites', 'Premium templates', 'Priority AI chat', 'ATS optimization', 'PDF export'];

export function Pricing() {
	return (
		<Box id="pricing" py={20}>
			<Container maxW="container.xl">
				<VStack gap={12}>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
						<VStack gap={4} textAlign="center">
							<Heading size="3xl" fontWeight="bold" color="white">
								Simple, transparent pricing
							</Heading>
							<Text fontSize="lg" color="gray.400" maxW="2xl">
								Start free, upgrade when you're ready
							</Text>
						</VStack>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<Card.Root
							bg="rgba(255, 255, 255, 0.05)"
							border="2px solid"
							borderColor="purple.500/50"
							backdropFilter="blur(20px)"
							p={10}
							maxW="md"
							mx="auto"
							position="relative"
							overflow="hidden"
						>
							{/* Gradient accent */}
							<Box
								position="absolute"
								top={0}
								left={0}
								right={0}
								h="4px"
								bgGradient="linear(to-r, purple.500, pink.500)"
							/>

							<VStack gap={6} align="stretch">
								<VStack gap={2} align="start">
									<Text fontSize="sm" color="purple.400" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
										Pro Plan
									</Text>
									<HStack align="baseline">
										<Heading size="4xl" color="white" fontWeight="bold">
											$19
										</Heading>
										<Text fontSize="lg" color="gray.400">
											/month
										</Text>
									</HStack>
								</VStack>

								<List.Root gap={3}>
									{features.map((feature) => (
										<List.Item key={feature}>
											<HStack gap={3}>
												<Box
													w={5}
													h={5}
													borderRadius="full"
													bgGradient="linear(to-r, purple.500, pink.500)"
													display="flex"
													alignItems="center"
													justifyContent="center"
													flexShrink={0}
												>
													<LuCheck size={14} color="white" />
												</Box>
												<Text color="gray.300">{feature}</Text>
											</HStack>
										</List.Item>
									))}
								</List.Root>

								<Link href="/auth/register" style={{ width: '100%' }}>
									<Button
										w="full"
										size="xl"
										bgGradient="linear(to-r, purple.500, pink.500)"
										color="white"
										_hover={{ bgGradient: 'linear(to-r, purple.600, pink.600)', transform: 'translateY(-2px)', boxShadow: 'xl' }}
										transition="all 0.2s"
									>
										Get Started
									</Button>
								</Link>
							</VStack>
						</Card.Root>
					</motion.div>
				</VStack>
			</Container>
		</Box>
	);
}

