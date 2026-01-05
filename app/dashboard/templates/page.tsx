import { AppCard, AppCardHeadless } from '@/components/ui/app-card';
import { Container, Stack, For, Text, Heading, SimpleGrid, GridItem, Box, AspectRatio, VStack } from '@chakra-ui/react';

export default function TemplatesPage() {
	const templates = [
		{ name: 'Standard', description: 'Free template' },
		{ name: 'Default', description: 'Premium template' },
		{ name: 'Modern', description: 'Premium template' },
		{ name: 'Classic', description: 'Premium template' },
		{ name: 'Elegant', description: 'Premium template' },
	];
	return (
		<Stack boxSize={'full'} justify={'center'}>
			<Container maxWidth={'5xl'} boxSize={'full'}>
				<AppCard
					title="Templates"
					description="Choose a template to apply to this edit"
					bg={'transparent'}
					border={'none'}
					divideY={'none'}
					headerStyle={{ paddingX: 0, paddingTop: 4, gap: 2 }}
					titleStyle={{ fontSize: '2xl', color: 'GrayText' }}
					bodyStyle={{ spaceY: 6, paddingX: 0 }}
				>
					<SimpleGrid columns={{ base: 2, md: 12 }} gap={4}>
						<For each={templates}>
							{(template) => (
								<GridItem colSpan={{ base: 1, md: 3 }} key={template.name}>
									<AppCardHeadless gap={4} rounded={'xl'} className="group" cursor={'pointer'} _hover={{ shadow: 'lg' }}>
										<AspectRatio ratio={8 / 10}>
											<Box boxSize={'full'} bg={'bg.muted'} rounded={'lg'} />
										</AspectRatio>
										<VStack gap={0}>
											<Heading size={'lg'} fontWeight={'bold'} _groupHover={{ color: 'blue.500', transition: 'color 0.2s ease-in-out' }}>
												{template.name}
											</Heading>
											<Text fontSize={'sm'} color={'GrayText'}>
												{template.description}
											</Text>
										</VStack>
									</AppCardHeadless>
								</GridItem>
							)}
						</For>
					</SimpleGrid>
				</AppCard>
			</Container>
		</Stack>
	);
}
