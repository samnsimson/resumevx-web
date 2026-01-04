'use client';
import Link from 'next/link';
import { Button, Icon, Stack } from '@chakra-ui/react';
import { FC, HTMLAttributes } from 'react';
import { HiOutlineCodeBracket, HiOutlineDocument, HiOutlineHome } from 'react-icons/hi2';

interface WorkSpaceSidebarProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

export const WorkSpaceSidebar: FC<WorkSpaceSidebarProps> = ({ ...props }) => {
	return (
		<Stack height={'full'} width={'full'} gap={4} padding={4} {...props}>
			<Button
				size={'xl'}
				width={'fit-content'}
				rounded={'full'}
				color={{ base: 'fg.muted', _hover: 'white' }}
				colorPalette={{ base: 'gray', _hover: 'blue' }}
				variant={{ base: 'ghost', _hover: 'solid' }}
				_hover={{ textDecoration: 'none' }}
				asChild
			>
				<Link href={'/dashboard'}>
					<Icon as={HiOutlineHome} boxSize={'24px'} />
					Home
				</Link>
			</Button>
			<Button
				size={'xl'}
				width={'fit-content'}
				rounded={'full'}
				color={{ base: 'fg.muted', _hover: 'white' }}
				colorPalette={{ base: 'gray', _hover: 'blue' }}
				variant={{ base: 'ghost', _hover: 'solid' }}
				_hover={{ textDecoration: 'none' }}
				asChild
			>
				<Link href={'/dashboard/templates'}>
					<Icon as={HiOutlineCodeBracket} boxSize={'24px'} />
					Resume Templates
				</Link>
			</Button>
			<Button
				size={'xl'}
				width={'fit-content'}
				rounded={'full'}
				color={{ base: 'fg.muted', _hover: 'white' }}
				colorPalette={{ base: 'gray', _hover: 'blue' }}
				variant={{ base: 'ghost', _hover: 'solid' }}
				_hover={{ textDecoration: 'none' }}
				asChild
			>
				<Link href={'/dashboard/my-resume'}>
					<Icon as={HiOutlineDocument} boxSize={'24px'} />
					My Resumes
				</Link>
			</Button>
		</Stack>
	);
};
