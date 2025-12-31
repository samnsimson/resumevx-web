'use client';
import { Button, Icon, Link, Stack } from '@chakra-ui/react';
import { FC, HTMLAttributes } from 'react';
import { HiOutlineCodeBracket, HiOutlineDocument, HiOutlineHome } from 'react-icons/hi2';

interface WorkSpaceSidebarProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

export const WorkSpaceSidebar: FC<WorkSpaceSidebarProps> = ({ ...props }) => {
	return (
		<Stack height={'full'} width={'full'} gap={4} padding={4} {...props}>
			<Button size={'xl'} width={'fit-content'} variant={'ghost'} colorPalette={'blue'} rounded={'full'} _hover={{ textDecoration: 'none' }} asChild>
				<Link href={'/workspace/new'}>
					<Icon as={HiOutlineHome} boxSize={'24px'} />
					Home
				</Link>
			</Button>
			<Button size={'xl'} width={'fit-content'} variant={'ghost'} colorPalette={'blue'} rounded={'full'} _hover={{ textDecoration: 'none' }} asChild>
				<Link href={'/workspace/templates'}>
					<Icon as={HiOutlineCodeBracket} boxSize={'24px'} />
					Resume Templates
				</Link>
			</Button>
			<Button size={'xl'} width={'fit-content'} variant={'ghost'} colorPalette={'blue'} rounded={'full'} _hover={{ textDecoration: 'none' }} asChild>
				<Link href={'/workspace/resumes'}>
					<Icon as={HiOutlineDocument} boxSize={'24px'} />
					My Resumes
				</Link>
			</Button>
		</Stack>
	);
};
