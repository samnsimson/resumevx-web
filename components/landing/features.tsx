'use client';
import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { LuCheckCheck, LuTarget, LuSparkles } from 'react-icons/lu';
import { Card } from '@chakra-ui/react';

const features = [
	{
		icon: LuCheckCheck,
		title: 'ATS Optimization',
		description: 'Ensure your resume passes through Applicant Tracking Systems with keyword optimization and proper formatting.',
	},
	{
		icon: LuTarget,
		title: 'Job Description Matching',
		description: 'Automatically align your resume with job requirements to increase your chances of getting noticed by recruiters.',
	},
	{
		icon: LuSparkles,
		title: 'AI Fine-tuning Chat',
		description: 'Have a conversation with AI to refine every section of your resume until it perfectly represents your expertise.',
	},
];

export function Features() {
	return (
		<Box id="features" py={20}>
			<Container maxW="container.xl">
				<VStack gap={12}>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
						<VStack gap={4} textAlign="center">
							<Heading size="3xl" fontWeight="bold" color="white">
								Everything you need to land your dream job
							</Heading>
							<Text fontSize="lg" color="gray.400" maxW="2xl">
								Powerful features designed to make your resume stand out in a competitive job market
							</Text>
						</VStack>
					</motion.div>

					<SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<Card.Root
									bg="rgba(255, 255, 255, 0.05)"
									border="1px solid"
									borderColor="whiteAlpha.200"
									backdropFilter="blur(20px)"
									p={8}
									h="full"
									_hover={{
										borderColor: 'purple.500/50',
										transform: 'translateY(-4px)',
										boxShadow: 'xl',
									}}
									transition="all 0.3s"
								>
									<VStack gap={4} align="start">
										<Box
											w={12}
											h={12}
											borderRadius="lg"
											bgGradient="linear(to-r, purple.500/20, pink.500/20)"
											border="1px solid"
											borderColor="purple.500/30"
											display="flex"
											alignItems="center"
											justifyContent="center"
											color="purple.400"
										>
											<feature.icon size={24} />
										</Box>
										<Heading size="lg" color="white">
											{feature.title}
										</Heading>
										<Text color="gray.400" lineHeight="tall">
											{feature.description}
										</Text>
									</VStack>
								</Card.Root>
							</motion.div>
						))}
					</SimpleGrid>
				</VStack>
			</Container>
		</Box>
	);
}
