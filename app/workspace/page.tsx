import { ResumeUpload } from '@/components/file-upload';
import { GridItem, HStack, Show, SimpleGrid, Stack } from '@chakra-ui/react';
import { JobDescription } from '@/components/job-description';
import { SectionTitle } from '@/components/ui/section-title';
import { ContinueButton } from '@/components/workspace/continue-button';
import { SessionStateApi } from '@/lib/api';
import { headers } from 'next/headers';
import { ChatWidget } from '@/components/chat-widget';
import { ResumePreview } from '@/components/resume-preview';
import { StartOverButton } from '@/components/workspace/start-over-button';

export default async function WorkspacePage({}: PageProps<'/workspace'>) {
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: await headers() });
	return (
		<Stack gap={6} height={'full'}>
			<HStack justify={'space-between'}>
				<SectionTitle
					title="New Workspace"
					description="Create a new workspace to get started"
					headingStyle={{ size: 'xl', color: 'fg.muted' }}
					descriptionStyle={{ fontSize: 'md', color: 'GrayText' }}
				/>
				<Show when={sessionState}>{(sessionState) => <StartOverButton sessionStateId={sessionState.id} />}</Show>
				<Show when={!sessionState}>
					<ContinueButton />
				</Show>
			</HStack>
			<Show when={sessionState}>
				{(sessionState) => (
					<SimpleGrid columns={{ base: 1, md: 2 }} gap={4} height={'full'} minHeight={0}>
						<GridItem colSpan={1} height={'full'} minHeight={0} overflow={'hidden'}>
							<ChatWidget height={'full'} sessionState={sessionState} />
						</GridItem>
						<GridItem colSpan={1} height={'full'} minHeight={0} overflow={'hidden'}>
							<ResumePreview height={'full'} sessionState={sessionState} />
						</GridItem>
					</SimpleGrid>
				)}
			</Show>
			<Show when={!sessionState}>
				<SimpleGrid columns={2} gap={4} height={'full'}>
					<GridItem colSpan={1}>
						<ResumeUpload height={'full'} />
					</GridItem>
					<GridItem colSpan={1}>
						<JobDescription height={'full'} />
					</GridItem>
				</SimpleGrid>
			</Show>
		</Stack>
	);
}
