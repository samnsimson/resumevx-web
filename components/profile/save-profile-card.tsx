'use client';
import { FC } from 'react';
import { AppCardHeadless } from '@/components/ui/app-card';
import { HStack, Field, Input, Button, CardRootProps } from '@chakra-ui/react';
import { LuSave } from 'react-icons/lu';
import { useAccessControl } from '@/components/providers/access-control.provider';

interface SaveProfileCardProps extends CardRootProps {
	[x: string]: any;
}

export const SaveProfileCard: FC<SaveProfileCardProps> = ({ ...props }) => {
	const { user } = useAccessControl();
	return (
		<AppCardHeadless gap={4} {...props}>
			<HStack gap={4}>
				<Field.Root>
					<Field.Label color={'GrayText'}>Name</Field.Label>
					<Input variant={'subtle'} size={'xl'} type="text" value={user?.name} />
				</Field.Root>
				<Field.Root>
					<Field.Label color={'GrayText'}>Username</Field.Label>
					<Input variant={'subtle'} size={'xl'} type="text" value={user?.username} readOnly disabled />
				</Field.Root>
			</HStack>
			<Field.Root>
				<Field.Label color={'GrayText'}>Email</Field.Label>
				<Input variant={'subtle'} size={'xl'} type="text" value={user?.email} readOnly disabled />
			</Field.Root>
			<Button variant={'solid'} colorPalette={'info'} size={'lg'}>
				<LuSave />
				Save Profile
			</Button>
		</AppCardHeadless>
	);
};
