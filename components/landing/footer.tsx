'use client';
import { Box, Container, Heading, SimpleGrid, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const footerColumns = [
	{
		title: 'Product',
		links: [
			{ label: 'Features', href: '#features' },
			{ label: 'Pricing', href: '#pricing' },
			{ label: 'Templates', href: '/dashboard/templates' },
		],
	},
	{
		title: 'Company',
		links: [
			{ label: 'About', href: '#' },
			{ label: 'Blog', href: '#' },
			{ label: 'Careers', href: '#' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Documentation', href: '#' },
			{ label: 'Support', href: '#' },
			{ label: 'API', href: '#' },
		],
	},
	{
		title: 'Legal',
		links: [
			{ label: 'Privacy', href: '#' },
			{ label: 'Terms', href: '#' },
			{ label: 'Security', href: '#' },
		],
	},
];

export function Footer() {
	return (
		<Box borderTop="1px solid" borderColor="whiteAlpha.100" py={12} bg="rgba(0, 0, 0, 0.5)">
			<Container maxW="container.xl">
				<SimpleGrid columns={{ base: 2, md: 4 }} gap={8} mb={8}>
					{footerColumns.map((column) => (
						<VStack key={column.title} align="start" gap={3}>
							<Heading size="sm" color="white" fontWeight="semibold">
								{column.title}
							</Heading>
							<VStack align="start" gap={2}>
								{column.links.map((link) => (
									<Link key={link.label} href={link.href}>
										<ChakraLink
											color="gray.400"
											fontSize="sm"
											_hover={{ color: 'white', textDecoration: 'underline' }}
										>
											{link.label}
										</ChakraLink>
									</Link>
								))}
							</VStack>
						</VStack>
					))}
				</SimpleGrid>

				<Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={8}>
					<Text color="gray.400" fontSize="sm" textAlign="center">
						© 2024 ResumeVX. All rights reserved.
					</Text>
				</Box>
			</Container>
		</Box>
	);
}

