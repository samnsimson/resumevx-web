import { ResumeUpload } from '@/components/file-upload';
import { JobDescription } from '@/components/job-description';
import { AppCard } from '@/components/ui/app-card';
import { ContinueButton } from '@/components/my-space/continue-button';
import { GridItem, SimpleGrid } from '@chakra-ui/react';

export default async function DataInputPage() {
	return (
		<GridItem colSpan={12}>
			<AppCard
				title="Let's get started"
				description="Upload your resume and paste the job description to continue"
				bg={'transparent'}
				border={'none'}
				divideY={'none'}
				height={'full'}
				actions={<ContinueButton />}
			>
				<SimpleGrid columns={12} gap={4} height={'full'}>
					<GridItem colSpan={4}>
						<ResumeUpload height={'full'} />
					</GridItem>
					<GridItem colSpan={4}>
						<JobDescription height={'full'} />
					</GridItem>
					<GridItem colSpan={4}>
						<AppCard title="Select template" description="Choose a template to apply to this edit"></AppCard>
					</GridItem>
				</SimpleGrid>
			</AppCard>
		</GridItem>
	);
}
