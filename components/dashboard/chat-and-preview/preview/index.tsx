import { headers } from 'next/headers';
import { DocumentApi, SessionState } from '@/lib/api';
import { parseHeaders } from '@/lib/utils';
import { StartOverButton } from '@/components/dashboard/chat-and-preview/preview/ui/start-over-button';
import { ResumePreview } from '@/components/dashboard/chat-and-preview/preview/resume-preview';
import { SaveButton } from '@/components/dashboard/chat-and-preview/preview/ui/save-button';
import { AppCard } from '@/components/ui/app-card';
import { Stack, Container, HStack, Show } from '@chakra-ui/react';
import { Loader } from '@/components/ui/loader';
import { DownloadPdfButton } from './ui/download-pdf-button';

interface PreviewComponentProps {
	sessionState: SessionState;
}

async function getDownloadUrl(data: Blob) {
	const arrayBuffer = await data.arrayBuffer();
	const base64 = Buffer.from(arrayBuffer).toString('base64');
	return `data:application/pdf;base64,${base64}`;
}

export async function PreviewComponent({ sessionState }: PreviewComponentProps) {
	if (!sessionState.documentData) return null;
	const nextHeaders = await headers();
	const body = { templateName: 'default' as const, documentData: sessionState.documentData };
	const { data } = await DocumentApi.generateDocument({ body, headers: parseHeaders(nextHeaders) });
	const downloadUrl = await getDownloadUrl(data as Blob);

	return (
		<Stack height={'full'} overflow={'scroll'}>
			<Container maxWidth={'4xl'} height={'full'}>
				<AppCard
					title="Preview"
					description="Preview your resume and make changes"
					bg={'transparent'}
					rounded={'none'}
					border={'none'}
					divideY={'none'}
					headerStyle={{ paddingTop: 4 }}
					actions={
						<HStack>
							<StartOverButton />
							<SaveButton />
							<DownloadPdfButton downloadUrl={downloadUrl} />
						</HStack>
					}
				>
					<Show when={data as Blob} fallback={Loader({ size: 'lg' })}>
						{(data: Blob) => <ResumePreview document={data} />}
					</Show>
				</AppCard>
			</Container>
		</Stack>
	);
}
