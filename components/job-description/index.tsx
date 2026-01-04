'use client';
import { FC } from 'react';
import { CardRootProps, Field, Show, Spinner, Textarea } from '@chakra-ui/react';
import { LuBriefcase } from 'react-icons/lu';
import { useDataInputForm } from '@/lib/hooks/useDataInputForm';
import { Controller } from 'react-hook-form';
import { AppCard } from '../ui/app-card';

interface JobDescriptionProps extends CardRootProps {
	[x: string]: unknown;
}

export const JobDescription: FC<JobDescriptionProps> = ({ ...props }) => {
	const { form } = useDataInputForm();
	return (
		<AppCard title="Job description" description="Provide the job description in the input box below" icon={LuBriefcase} flex={1} {...props}>
			<Show when={form} fallback={<Spinner />}>
				{(form) => (
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
				)}
			</Show>
		</AppCard>
	);
};
