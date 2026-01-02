import { DangerZone } from '@/components/profile/danger-zone';
import { SubscriptionCard } from '@/components/profile/subscription-card';
import { AppCardHeadless } from '@/components/ui/app-card';
import { SubscriptionsApi, UserApi } from '@/lib/api';
import { Button, Container, Field, Heading, HStack, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import { LuLock, LuSave } from 'react-icons/lu';

const ProfilePage: FC<PageProps<'/my-space/profile'>> = async () => {
	const { data } = await UserApi.getCurrentUser({ headers: await headers() });
	if (!data) return redirect('/auth/login');

	const { data: subscription } = await SubscriptionsApi.getSubscription({ headers: await headers() });

	return (
		<Container paddingY={4} maxWidth={'5xl'}>
			<VStack height={'full'} width={'full'} gap={6} overflow={'scroll'}>
				<VStack align={'start'} width={'full'} gap={0}>
					<Heading size={'2xl'}>Profile</Heading>
					<Text color={'GrayText'}>Manage your profile information and settings</Text>
				</VStack>
				<SimpleGrid width={'full'} columns={2} gap={4}>
					<AppCardHeadless gap={4}>
						<HStack gap={4}>
							<Field.Root>
								<Field.Label color={'GrayText'}>Name</Field.Label>
								<Input variant={'subtle'} size={'xl'} type="text" value={data.name} />
							</Field.Root>
							<Field.Root>
								<Field.Label color={'GrayText'}>Username</Field.Label>
								<Input variant={'subtle'} size={'xl'} type="text" value={data.username} readOnly disabled />
							</Field.Root>
						</HStack>
						<Field.Root>
							<Field.Label color={'GrayText'}>Email</Field.Label>
							<Input variant={'subtle'} size={'xl'} type="text" value={data.email} readOnly disabled />
						</Field.Root>
						<Button variant={'solid'} colorPalette={'blue'} size={'lg'}>
							<LuSave />
							Save Profile
						</Button>
					</AppCardHeadless>
					<AppCardHeadless gap={4}>
						<Field.Root>
							<Field.Label color={'GrayText'}>Old Password</Field.Label>
							<Input variant={'subtle'} size={'xl'} type="password" readOnly />
						</Field.Root>
						<Field.Root>
							<Field.Label color={'GrayText'}>New Password</Field.Label>
							<Input variant={'subtle'} size={'xl'} type="password" readOnly />
						</Field.Root>
						<Button variant={'solid'} colorPalette={'blue'} size={'lg'}>
							<LuLock />
							Change Password
						</Button>
					</AppCardHeadless>
				</SimpleGrid>
				<SubscriptionCard subscriptionInfo={subscription} />
				<DangerZone />
			</VStack>
		</Container>
	);
};
export default ProfilePage;
