import { ResumeUpload } from '@/components/file-upload';
import { GridItem, HStack, Show, SimpleGrid, Stack } from '@chakra-ui/react';
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
	let document: any = null;
	const requestHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: requestHeaders });

	if (sessionState && sessionState.documentData) {
		const body = { templateName: 'default' as const, documentData: sessionState.documentData };
		const { data, error } = await DocumentApi.generateDocument({ body, headers: parseHeaders(requestHeaders) });
		if (error) console.error('🚀 ~ WorkspacePage ~ error:', error);
		if (data) document = data;
		console.log('🚀 ~ WorkspacePage ~ data:', typeof document);
	}

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
							<ResumePreview height={'full'} document={document} />
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
