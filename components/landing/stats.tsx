'use client';
import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const stats = [
	{
		value: '87%',
		label: 'more interviews',
		description: 'Users report significantly more interview callbacks',
	},
	{
		value: '202%',
		label: 'faster application time',
		description: 'Reduce time spent on each job application',
	},
];

export function Stats() {
	return (
		<Box py={20} bg="rgba(139, 92, 246, 0.05)" borderY="1px solid" borderColor="whiteAlpha.100">
			<Container maxW="container.xl">
				<SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
						>
							<VStack align={{ base: 'center', md: 'start' }} gap={2}>
								<Heading
									size="4xl"
									fontWeight="bold"
									bgGradient="linear(to-r, purple.400, pink.400)"
									bgClip="text"
									lineHeight="1"
								>
									{stat.value}
								</Heading>
								<Text fontSize="2xl" color="white" fontWeight="semibold">
									{stat.label}
								</Text>
								<Text fontSize="md" color="gray.400" maxW="md" textAlign={{ base: 'center', md: 'left' }}>
									{stat.description}
								</Text>
							</VStack>
						</motion.div>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
}

