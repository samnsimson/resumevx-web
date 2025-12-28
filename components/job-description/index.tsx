'use client';
import { FC } from 'react';
import { CardRootProps, Field, Textarea } from '@chakra-ui/react';
import { LuBriefcase } from 'react-icons/lu';
import { useWorkspaceForm } from '@/lib/hooks/useWorkspaceForm';
import { Controller } from 'react-hook-form';
import { AppCard } from '../ui/app-card';

interface JobDescriptionProps extends CardRootProps {
	[x: string]: unknown;
}

export const JobDescription: FC<JobDescriptionProps> = ({ ...props }) => {
	const { form } = useWorkspaceForm();
	if (!form) return null;
	return (
		<AppCard title="Paste the job description" description="Provide the job description in the input box below" icon={LuBriefcase} flex={1} {...props}>
			<Controller
				control={form.control}
				name="jobDescription"
				render={({ field }) => (
					<Field.Root height={'full'} required invalid={!!form.formState.errors.jobDescription}>
						<Textarea
							variant={'subtle'}
							border={'1px solid'}
							borderColor={'border.emphasized'}
							rounded={'lg'}
							height={'full'}
							placeholder="Enter job description"
							{...field}
						/>
						<Field.ErrorText>{form.formState.errors.jobDescription?.message}</Field.ErrorText>
					</Field.Root>
				)}
			/>
		</AppCard>
	);
};
