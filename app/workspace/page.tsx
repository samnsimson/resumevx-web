import { ResumeUpload } from '@/components/file-upload';
import { GridItem, HStack, Show, SimpleGrid } from '@chakra-ui/react';
import { JobDescription } from '@/components/job-description';
import { SectionTitle } from '@/components/ui/section-title';
import { ContinueButton } from '@/components/workspace/continue-button';
import { DocumentApi, SessionStateApi } from '@/lib/api';
import { headers } from 'next/headers';
import { ChatWidget } from '@/components/chat-widget';
import { ResumePreview } from '@/components/resume-preview';
import { StartOverButton } from '@/components/workspace/start-over-button';
import { parseHeaders } from '@/lib/utils/server.utils';

export default async function WorkspacePage({}: PageProps<'/workspace'>) {
	let document: Blob | null = null;
	const requestHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: requestHeaders });

	if (sessionState && sessionState.documentData) {
		const body = { templateName: 'default' as const, documentData: sessionState.documentData };
		const { data } = await DocumentApi.generateDocument({ body, headers: parseHeaders(requestHeaders) });
		if (data) document = data as Blob;
	}

	return (
		<SimpleGrid columns={12} flex={1} minHeight={0} divideX={'1px'} divideColor={'border'}>
			<GridItem colSpan={sessionState ? 7 : 12} padding={4} flex={1} minHeight={0}>
				<HStack justify={'space-between'}>
					<SectionTitle
						title="New Workspace"
						description="Create a new workspace to get started"
						headingStyle={{ size: 'xl', color: 'fg.muted' }}
						descriptionStyle={{ fontSize: 'md', color: 'GrayText' }}
					/>
					<Show when={sessionState} fallback={<ContinueButton />}>
						{(sessionState) => <StartOverButton sessionStateId={sessionState.id} />}
					</Show>
				</HStack>
				<Show
					when={document}
					fallback={
						<SimpleGrid columns={2} gap={4} flex={1} minHeight={0}>
							<GridItem colSpan={1}>
								<ResumeUpload height={'full'} />
							</GridItem>
							<GridItem colSpan={1}>
								<JobDescription height={'full'} />
							</GridItem>
						</SimpleGrid>
					}
				>
					{(document) => <ResumePreview flex={1} minHeight={0} document={document} />}
				</Show>
			</GridItem>
			<Show when={sessionState}>
				{(sessionState) => (
					<GridItem colSpan={5} height={'full'}>
						<ChatWidget height={'full'} sessionState={sessionState} />
					</GridItem>
				)}
			</Show>
		</SimpleGrid>
	);
}
