// import { ResumeUpload } from '@/components/file-upload';
// import { Container, GridItem, Show, SimpleGrid } from '@chakra-ui/react';
// import { JobDescription } from '@/components/job-description';
// import { ContinueButton } from '@/components/my-space/continue-button';
// import { DocumentApi, SessionStateApi } from '@/lib/api';
// import { headers } from 'next/headers';
// import { ChatWidget } from '@/components/chat-widget';
// import { ResumePreview } from '@/components/resume-preview';
// import { StartOverButton } from '@/components/my-space/start-over-button';
// import { parseHeaders } from '@/lib/utils/server.utils';
// import { AppCard } from '@/components/ui/app-card';

export default async function MySpacePage({}: PageProps<'/my-space'>) {
	// let document: Blob | null = null;
	// const requestHeaders = await headers();
	// const { data: sessionState } = await SessionStateApi.getSessionState({ headers: requestHeaders });

	// if (sessionState && sessionState.documentData) {
	// 	const body = { templateName: 'default' as const, documentData: sessionState.documentData };
	// 	const { data } = await DocumentApi.generateDocument({ body, headers: parseHeaders(requestHeaders) });
	// 	if (data) document = data as Blob;
	// }

	// return (
	// 	<SimpleGrid columns={12} height={'full'} divideX={'1px'} divideColor={'border'}>
	// 		<GridItem colSpan={sessionState ? 8 : 12} display={'flex'} flexDirection={'row'} flex={1} minHeight={0}>
	// 			<AppCard
	// 				title="MySpace"
	// 				description="Preview and edit your resume"
	// 				background={'transparent'}
	// 				divideY={'none'}
	// 				border={'none'}
	// 				flex={1}
	// 				minHeight={0}
	// 				headerStyle={{ paddingY: 2, paddingX: 0, width: 'full', maxWidth: '4xl', marginX: 'auto' }}
	// 				bodyStyle={{ display: 'flex', overflowY: 'scroll', padding: 0 }}
	// 				titleStyle={{ fontSize: 'xl', color: 'fg' }}
	// 				actions={
	// 					<Show when={sessionState} fallback={<ContinueButton />}>
	// 						{(sessionState) => <StartOverButton sessionStateId={sessionState.id} />}
	// 					</Show>
	// 				}
	// 			>
	// 				<Container maxWidth={'4xl'} padding={0}>
	// 					<Show
	// 						when={document}
	// 						fallback={
	// 							<SimpleGrid columns={2} gap={4} flex={1} minHeight={0}>
	// 								<GridItem colSpan={1}>
	// 									<ResumeUpload height={'full'} />
	// 								</GridItem>
	// 								<GridItem colSpan={1}>
	// 									<JobDescription height={'full'} />
	// 								</GridItem>
	// 							</SimpleGrid>
	// 						}
	// 					>
	// 						{(document) => <ResumePreview flex={1} minHeight={0} document={document} />}
	// 					</Show>
	// 				</Container>
	// 			</AppCard>
	// 		</GridItem>
	// 		<Show when={sessionState}>
	// 			{(sessionState) => (
	// 				<GridItem colSpan={4} display={'flex'} flexDirection={'row'} flex={1} minHeight={0}>
	// 					<ChatWidget flex={1} sessionState={sessionState} />
	// 				</GridItem>
	// 			)}
	// 		</Show>
	// 	</SimpleGrid>
	// );
	return null;
}
