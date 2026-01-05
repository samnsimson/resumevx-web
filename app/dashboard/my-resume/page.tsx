import { AppCard } from '@/components/ui/app-card';
import { Container, Stack } from '@chakra-ui/react';

export default function MyResumePage() {
	return (
		<Stack boxSize={'full'} justify={'center'}>
			<Container maxWidth={'5xl'} boxSize={'full'}>
				<AppCard
					title="My Resume"
					description="Manage your resume and templates"
					bg={'transparent'}
					border={'none'}
					divideY={'none'}
					headerStyle={{ paddingX: 0, paddingTop: 4, gap: 2 }}
					titleStyle={{ fontSize: '2xl', color: 'GrayText' }}
					bodyStyle={{ spaceY: 6, paddingX: 0 }}
				></AppCard>
			</Container>
		</Stack>
	);
}
