import { FC } from 'react';
import { ButtonProps, IconButton } from '@chakra-ui/react';
import { LuBookmark } from 'react-icons/lu';

interface SaveButtonProps extends ButtonProps {
	[x: string]: any;
}

export const SaveButton: FC<SaveButtonProps> = ({ ...props }) => {
	return (
		<IconButton variant={'surface'} colorPalette={'blue'} rounded={'full'} size={'lg'} {...props}>
			<LuBookmark />
		</IconButton>
	);
};
