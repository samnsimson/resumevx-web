import { headers } from 'next/headers';
import { DocumentApi, SessionState } from '@/lib/api';
import { parseHeaders } from '@/lib/utils';
import { StartOverButton } from '@/components/dashboard/chat-and-preview/preview/ui/start-over-button';
import { ResumePreview } from '@/components/dashboard/chat-and-preview/preview/resume-preview';
import { SaveButton } from '@/components/dashboard/chat-and-preview/preview/ui/save-button';
import { Stack, HStack, Show, Tabs, Container, Box } from '@chakra-ui/react';
import { DownloadPdfButton } from './ui/download-pdf-button';
import { LoadingPlaceholder } from './ui/loading-placeholder';
import { SectionTitle } from '@/components/ui/section-title';

interface PreviewComponentProps {
	sessionState: SessionState;
}

async function getDownloadUrl(data: Blob) {
	const arrayBuffer = await data.arrayBuffer();
	const base64 = Buffer.from(arrayBuffer).toString('base64');
	return `data:application/pdf;base64,${base64}`;
}

export async function PreviewComponent({ sessionState }: PreviewComponentProps) {
	if (!sessionState.generatedDocumentData || !sessionState.documentUrl) return null;
	const nextHeaders = await headers();
	const body = { templateName: 'default' as const, documentData: sessionState.generatedDocumentData };
	const { data, error } = await DocumentApi.generateDocument({ body, headers: parseHeaders(nextHeaders) });
	if (error && !data) throw new Error(error.detail?.join(', ') || 'Failed to generate document');
	const downloadUrl = await getDownloadUrl(data as Blob);

	return (
		<Stack boxSize={'full'} overflow={'hidden'} gap={0}>
			<Stack bg={'bg.panel'} flexShrink={0} minHeight={0} paddingBottom={4}>
				<Container maxWidth={'4xl'}>
					<HStack justify={'space-between'}>
						<SectionTitle title="Preview" description="Preview your resume and make changes" headingStyle={{ fontSize: 'lg' }} />
						<HStack>
							<StartOverButton size={'sm'} colorPalette={'primary'} />
							<SaveButton size={'sm'} colorPalette={'primary'} />
							<DownloadPdfButton size={'sm'} downloadUrl={downloadUrl} colorPalette={'primary'} />
						</HStack>
					</HStack>
				</Container>
			</Stack>
			<Tabs.Root colorPalette={'primary'} defaultValue="generated" boxSize={'full'} flexGrow={1} _before={{ display: 'none' }}>
				<Box bg={'bg.panel'} flexShrink={0} minHeight={0} borderBottomWidth={'1px'} borderColor={'border'}>
					<Container maxWidth={'4xl'}>
						<Tabs.List flexShrink={0} minHeight={0} _before={{ display: 'none' }} border={'none'}>
							<Tabs.Trigger value="generated" _selected={{ color: 'primary' }}>
								AI Generated
							</Tabs.Trigger>
							<Tabs.Trigger value="original" _selected={{ color: 'primary' }}>
								Original
							</Tabs.Trigger>
							<Tabs.Trigger value="cover-letter" _selected={{ color: 'primary' }}>
								Cover Letter
							</Tabs.Trigger>
						</Tabs.List>
					</Container>
				</Box>
				<Tabs.Content value="generated" padding={4} boxSize={'full'} overflow={'scroll'} flexGrow={1}>
					<Container maxWidth={'4xl'}>
						<Show when={data as unknown as Blob} fallback={<LoadingPlaceholder />}>
							{(data: Blob) => <ResumePreview source={data} />}
						</Show>
					</Container>
				</Tabs.Content>
				<Tabs.Content value="original" padding={4} boxSize={'full'} overflow={'scroll'} flexGrow={1}>
					<Container maxWidth={'4xl'}>
						<Show when={sessionState.documentUrl} fallback={<LoadingPlaceholder />}>
							{(url: string) => <ResumePreview source={url} />}
						</Show>
					</Container>
				</Tabs.Content>
				<Tabs.Content value="cover-letter" padding={4} boxSize={'full'} overflow={'scroll'} flexGrow={1}>
					Manage your tasks for freelancers
				</Tabs.Content>
			</Tabs.Root>
		</Stack>
	);
}
