import { DangerZone } from '@/components/profile/danger-zone';
import { SubscriptionCard } from '@/components/profile/subscription-card';
import { PaymentsApi, UserApi } from '@/lib/api';
import { Card, Container, Field, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

const ProfilePage: FC<PageProps<'/workspace/profile'>> = async () => {
	const { data } = await UserApi.getCurrentUser({ headers: await headers() });
	if (!data) return redirect('/auth/login');

	const { data: subscription } = await PaymentsApi.getSubscription({ headers: await headers() });

	return (
		<Container paddingY={4} maxWidth={'5xl'}>
			<VStack height={'full'} width={'full'} gap={6} overflow={'scroll'}>
				<VStack align={'start'} width={'full'} gap={0}>
					<Heading size={'2xl'}>Profile</Heading>
					<Text color={'GrayText'}>Manage your profile information and settings</Text>
				</VStack>
				<Card.Root width={'full'} bg={'bg.muted'}>
					<Card.Body gap={4}>
						<Field.Root>
							<Field.Label color={'GrayText'}>Name</Field.Label>
							<Input variant={'outline'} bg={'bg.panel'} size={'xl'} type="text" value={data.name} readOnly />
						</Field.Root>
						<Field.Root>
							<Field.Label color={'GrayText'}>Username</Field.Label>
							<Input variant={'outline'} bg={'bg.panel'} size={'xl'} type="text" value={data.username} readOnly />
						</Field.Root>
						<Field.Root>
							<Field.Label color={'GrayText'}>Email</Field.Label>
							<Input variant={'outline'} bg={'bg.panel'} size={'xl'} type="text" value={data.email} readOnly />
						</Field.Root>
					</Card.Body>
				</Card.Root>
				<SubscriptionCard subscriptionInfo={subscription} />
				<DangerZone />
			</VStack>
		</Container>
	);
};
export default ProfilePage;
