'use client';
import { Stack } from '@chakra-ui/react';
import { FC, HTMLAttributes } from 'react';
import { HiCodeBracket, HiDocument, HiHome } from 'react-icons/hi2';
import { ToolTipButton } from './tooltip-button';

interface WorkSpaceSidebarProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

export const WorkSpaceSidebar: FC<WorkSpaceSidebarProps> = ({ ...props }) => {
	return (
		<Stack height={'full'} width={'full'} {...props} divideY={'1px'} divideColor={'border'} gap={0}>
			<ToolTipButton icon={HiHome} href={'/workspace'} description={'Home page'} position={{ placement: 'right' }} />
			<ToolTipButton icon={HiCodeBracket} href={'/workspace/templates'} description={'Resume Templates'} position={{ placement: 'right' }} />
			<ToolTipButton icon={HiDocument} href={'/workspace/resumes'} description={'My Resumes'} position={{ placement: 'right' }} />
		</Stack>
	);
};
