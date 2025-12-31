import { ChatWidget } from '@/components/chat-widget';
import { ResumePreview } from '@/components/resume-preview';
import { SectionTitle } from '@/components/ui/section-title';
import { ClientProxy } from '@/components/workspace/client-proxy';
import { GridItem, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { SessionStateApi } from '@/lib/api';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AssistantPage({}: PageProps<'/workspace/assistant'>) {
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: await headers() });
	if (!sessionState) return redirect('/workspace');
	return (
		<ClientProxy>
			<Stack gap={6} height={'full'} minHeight={0} overflow={'hidden'}>
				<HStack justify={'space-between'} flexShrink={0}>
					<SectionTitle
						title="AI Assistant"
						description="Chat with AI to refine your results"
						headingStyle={{ size: 'xl', color: 'fg.muted' }}
						descriptionStyle={{ fontSize: 'md', color: 'GrayText' }}
					/>
				</HStack>
				<SimpleGrid columns={{ base: 1, md: 2 }} gap={4} height={'full'} minHeight={0}>
					<GridItem colSpan={1} height={'full'} minHeight={0} overflow={'hidden'}>
						<ChatWidget height={'full'} sessionState={sessionState} />
					</GridItem>
					<GridItem colSpan={1} height={'full'} minHeight={0} overflow={'hidden'}>
						<ResumePreview height={'full'} sessionState={sessionState} />
					</GridItem>
				</SimpleGrid>
			</Stack>
		</ClientProxy>
	);
}
