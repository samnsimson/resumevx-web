import { FC } from 'react';
import { Button, CardRootProps } from '@chakra-ui/react';
import { HiOutlineEye } from 'react-icons/hi2';
import { TemplateSelector } from '../template-selector';
import { AppCard } from '../ui/app-card';

interface ResumeTemplateProps extends CardRootProps {
	[x: string]: any;
}

export const ResumeTemplate: FC<ResumeTemplateProps> = ({ ...props }) => {
	return (
		<AppCard
			title="Select template"
			description="Choose a template to apply to this edit"
			actions={
				<Button size={'sm'} variant={'ghost'} rounded={'full'}>
					<HiOutlineEye /> Preview
				</Button>
			}
			{...props}
		>
			<TemplateSelector templates={['Default', 'Modern', 'Classic', 'Elegant']} />
		</AppCard>
	);
};
