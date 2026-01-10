import { Container, Heading, Stack, Text } from '@chakra-ui/react';

export default function SubscriptionPage({}: PageProps<'/dashboard/subscription'>) {
	return (
		<Stack boxSize={'full'} justify={'center'}>
			<Container maxWidth={'5xl'} boxSize={'full'}>
				<Heading>Subscription</Heading>
				<Text>Manage your subscription and billing information</Text>
			</Container>
		</Stack>
	);
}
