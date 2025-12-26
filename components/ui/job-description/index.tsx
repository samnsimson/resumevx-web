'use client';
import { FC } from 'react';
import { Field, Stack, StackProps, Textarea, VStack } from '@chakra-ui/react';
import { LuBriefcase } from 'react-icons/lu';
import { SectionTitle } from '../section-title';
import { useWorkspaceForm } from '@/lib/hooks/useWorkspaceForm';
import { Controller } from 'react-hook-form';

interface JobDescriptionProps extends StackProps {
	[x: string]: unknown;
}

export const JobDescription: FC<JobDescriptionProps> = ({ ...props }) => {
	const { form } = useWorkspaceForm();
	if (!form) return null;
	return (
		<VStack width={'full'} align={'flex-start'} height={'full'} {...props}>
			<SectionTitle title="Paste the job description" description="Provide the job description in the input box below" icon={LuBriefcase} />

			<Stack width={'full'} flex={'1'} minHeight={0} overflow={'auto'}>
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
			</Stack>
		</VStack>
	);
};
