import { DangerZone } from '@/components/profile/danger-zone';
import { SaveProfileCard } from '@/components/profile/save-profile-card';
import { SubscriptionCard } from '@/components/profile/subscription-card';
import { AppCardHeadless } from '@/components/ui/app-card';
import { UserApi } from '@/lib/api';
import { parseHeaders } from '@/lib/utils';
import { Button, Container, Field, Heading, Input, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import { LuLock } from 'react-icons/lu';

const ProfilePage: FC<PageProps<'/dashboard/profile'>> = async () => {
	const nextHeaders = await headers();
	const { data } = await UserApi.getCurrentUser({ headers: parseHeaders(nextHeaders) });
	if (!data) return redirect('/auth/login');

	return (
		<Stack boxSize={'full'} bg={'bg.muted'}>
			<Container paddingY={4} maxWidth={'5xl'} spaceY={6}>
				<VStack align={'start'} width={'full'} gap={0}>
					<Heading size={'2xl'}>Profile</Heading>
					<Text color={'GrayText'}>Manage your profile information and settings</Text>
				</VStack>
				<SimpleGrid width={'full'} columns={2} gap={4}>
					<SaveProfileCard />
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
				<SubscriptionCard />
				<DangerZone />
			</Container>
		</Stack>
	);
};
export default ProfilePage;
