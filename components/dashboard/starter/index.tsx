import { JobDescription } from '@/components/job-description';
import { ResumeTemplate } from '@/components/resume-template';
import { AppCard } from '@/components/ui/app-card';
import { SimpleGrid, GridItem } from '@chakra-ui/react';
import { ContinueButton } from '@/components/dashboard/starter/continue-button';
import { ResumeUpload } from '@/components/dashboard/starter/file-upload';

export async function StarterComponent() {
	return (
		<AppCard
			title="Let's get started"
			description="Upload your resume and paste the job description to continue"
			bg={'transparent'}
			border={'none'}
			divideY={'none'}
			height={'full'}
			width={'full'}
			headerStyle={{ paddingTop: 4 }}
			actions={<ContinueButton />}
		>
			<SimpleGrid columns={{ base: 1, md: 12 }} gap={4} height={'full'}>
				<GridItem colSpan={{ base: 1, md: 6 }} spaceY={6}>
					<ResumeUpload />
					<JobDescription />
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 6 }}>
					<ResumeTemplate />
				</GridItem>
			</SimpleGrid>
		</AppCard>
	);
}
