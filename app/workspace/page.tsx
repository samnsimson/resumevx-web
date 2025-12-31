import { ResumeUpload } from '@/components/file-upload';
import { GridItem, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { JobDescription } from '@/components/job-description';
import { SectionTitle } from '@/components/ui/section-title';
import { ContinueButton } from '@/components/workspace/continue-button';

export default function WorkspacePage({}: PageProps<'/workspace'>) {
	return (
		<Stack gap={6} height={'full'}>
			<HStack justify={'space-between'}>
				<SectionTitle
					title="New Workspace"
					description="Create a new workspace to get started"
					headingStyle={{ size: 'xl', color: 'fg.muted' }}
					descriptionStyle={{ fontSize: 'md', color: 'GrayText' }}
				/>
				<ContinueButton />
			</HStack>
			<SimpleGrid columns={2} gap={4} height={'full'}>
				<GridItem colSpan={1}>
					<ResumeUpload height={'full'} />
				</GridItem>
				<GridItem colSpan={1}>
					<JobDescription height={'full'} />
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
}
