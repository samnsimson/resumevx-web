import { AppCard } from '@/components/ui/app-card';
import { StartOverButton } from '@/components/dashboard/start-over-button';
import { headers } from 'next/headers';
import { DocumentApi, SessionState } from '@/lib/api';
import { parseHeaders } from '@/lib/utils';
import { ResumePreview } from '@/components/resume-preview';
import { Container, HStack, IconButton, Link, Show, Stack } from '@chakra-ui/react';
import { LuBookmark, LuDownload } from 'react-icons/lu';

interface PreviewPageProps {
	sessionState?: SessionState | null;
}

export async function PreviewPage({ sessionState }: PreviewPageProps) {
	if (!sessionState || !sessionState.documentData) return null;

	const requestHeaders = await headers();
	const body = { templateName: 'default' as const, documentData: sessionState.documentData };
	const { data } = await DocumentApi.generateDocument({ body, headers: parseHeaders(requestHeaders) });

	async function getDownloadUrl(blob: Blob) {
		try {
			const arrayBuffer = await blob.arrayBuffer();
			const base64 = Buffer.from(arrayBuffer).toString('base64');
			const dataUrl = `data:application/pdf;base64,${base64}`;
			return dataUrl;
		} catch (error) {
			console.error(error);
			return '';
		}
	}

	return (
		<Stack height={'full'} overflow={'scroll'}>
			<Container maxWidth={'4xl'} height={'full'}>
				<AppCard
					title="Preview"
					description="Preview your resume and make changes"
					bg={'transparent'}
					rounded={'none'}
					border={'none'}
					actions={
						<HStack>
							<StartOverButton />
							<IconButton variant={'surface'} colorPalette={'blue'} rounded={'full'} size={'lg'}>
								<LuBookmark />
							</IconButton>
							<IconButton variant={'surface'} colorPalette={'blue'} rounded={'full'} size={'lg'} asChild>
								<Link href={await getDownloadUrl(data as Blob)} download="resume.pdf">
									<LuDownload />
								</Link>
							</IconButton>
						</HStack>
					}
				>
					<Show when={data as Blob} fallback={<div>Loading preview...</div>}>
						{(data: Blob) => <ResumePreview document={data} />}
					</Show>
				</AppCard>
			</Container>
		</Stack>
	);
}
