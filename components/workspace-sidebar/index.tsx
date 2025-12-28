'use client';
import { Stack } from '@chakra-ui/react';
import { FC, HTMLAttributes } from 'react';
import { HiOutlineCodeBracket, HiOutlineDocument, HiOutlineHome } from 'react-icons/hi2';
import { ToolTipButton } from './tooltip-button';

interface WorkSpaceSidebarProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

export const WorkSpaceSidebar: FC<WorkSpaceSidebarProps> = ({ ...props }) => {
	return (
		<Stack height={'full'} width={'full'} {...props} gap={4}>
			<ToolTipButton icon={HiOutlineHome} href={'/workspace'} description={'Home page'} position={{ placement: 'right' }} />
			<ToolTipButton icon={HiOutlineCodeBracket} href={'/workspace/templates'} description={'Resume Templates'} position={{ placement: 'right' }} />
			<ToolTipButton icon={HiOutlineDocument} href={'/workspace/resumes'} description={'My Resumes'} position={{ placement: 'right' }} />
		</Stack>
	);
};
