'use client';
import { FC, useState } from 'react';
import { Button, CardRootProps, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LuTrash } from 'react-icons/lu';
import { AppCard } from '../ui/app-card';
import { useMutation } from '@tanstack/react-query';
import { deleteAccountMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useRouter } from 'next/navigation';
import { toaster } from '../ui/toaster';

interface DangerZoneProps extends CardRootProps {
	[x: string]: any;
}

export const DangerZone: FC<DangerZoneProps> = ({ ...props }) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const { mutate: deleteAccount } = useMutation({
		...deleteAccountMutation(),
		onMutate: () => setIsDeleting(true),
		onSuccess: () => router.push('/auth/login'),
		onError: (error) => toaster.error({ title: 'Error', description: error.message ?? 'Failed to delete account', closable: true }),
		onSettled: () => setIsDeleting(false),
	});

	return (
		<AppCard title="Danger Zone" description="Irreversible actions that affect your account" {...props}>
			<HStack bg={'bg.muted'} rounded={'lg'} padding={4} gap={4} border={'1px solid'} borderColor={'border'} width={'full'}>
				<VStack align={'start'} gap={0} flex={1}>
					<Heading size={'md'}>Delete Account</Heading>
					<Text color={'GrayText'}>Permanently delete your account and all associated data</Text>
				</VStack>
				<Button variant={'solid'} colorPalette={'error'} size={'sm'} loading={isDeleting} disabled={isDeleting} onClick={() => deleteAccount({})}>
					<LuTrash />
					Delete Account
				</Button>
			</HStack>
		</AppCard>
	);
};
