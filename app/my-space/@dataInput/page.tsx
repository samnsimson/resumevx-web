import { ResumeUpload } from '@/components/file-upload';
import { JobDescription } from '@/components/job-description';
import { AppCard } from '@/components/ui/app-card';
import { ContinueButton } from '@/components/my-space/continue-button';
import { Button, GridItem, SimpleGrid, Stack } from '@chakra-ui/react';
import { HiOutlineEye } from 'react-icons/hi2';
import { TemplateSelector } from '@/components/template-selector';

export default async function DataInputPage() {
	return (
		<Stack width={'full'} height={'full'} bg={'bg.muted'}>
			<AppCard
				title="Let's get started"
				description="Upload your resume and paste the job description to continue"
				bg={'transparent'}
				border={'none'}
				divideY={'none'}
				height={'full'}
				width={'full'}
				actions={<ContinueButton />}
			>
				<SimpleGrid columns={{ base: 1, md: 12 }} gap={4} height={'full'}>
					<GridItem colSpan={{ base: 1, md: 4 }}>
						<ResumeUpload height={'full'} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 4 }}>
						<JobDescription height={'full'} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 4 }}>
						<AppCard
							title="Select template"
							description="Choose a template to apply to this edit"
							actions={
								<Button size={'sm'} variant={'ghost'} rounded={'full'}>
									<HiOutlineEye /> Preview
								</Button>
							}
						>
							<TemplateSelector templates={['Default', 'Modern', 'Classic', 'Elegant']} />
						</AppCard>
					</GridItem>
				</SimpleGrid>
			</AppCard>
		</Stack>
	);
}
