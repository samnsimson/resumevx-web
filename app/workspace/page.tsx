import { ChatWidget } from '@/components/chat-widget';
import { ResumeUpload } from '@/components/file-upload';
import { JobDescription } from '@/components/job-description';
import { ResumePreview } from '@/components/resume-preview';
import { SimpleGrid, GridItem, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const WorkspacePage: FC<PageProps<'/workspace'>> = async () => {
	const data = null;
	return (
		<SimpleGrid columns={12} gap={4} height={'full'} width={'full'} overflow={'hidden'} paddingBottom={4}>
			<GridItem colSpan={3} height={'full'} overflow={'hidden'}>
				<VStack height={'full'} width={'full'}>
					<ResumeUpload activeDocumentPath={data} overflow={'auto'} />
					<JobDescription flex={1} overflow={'auto'} />
				</VStack>
			</GridItem>
			<GridItem colSpan={4} height={'full'} overflow={'hidden'}>
				<ChatWidget />
			</GridItem>
			<GridItem colSpan={5} height={'full'} overflow={'hidden'}>
				<ResumePreview activeDocumentPath={data} width={'full'} height={'full'} />
			</GridItem>
		</SimpleGrid>
	);
};
export default WorkspacePage;
