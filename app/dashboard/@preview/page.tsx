import { headers } from 'next/headers';
import { DocumentApi, SessionStateApi } from '@/lib/api';
import { parseHeaders } from '@/lib/utils';
import { StartOverButton } from '@/components/dashboard/start-over-button';
import { ResumePreview } from '@/components/resume-preview';
import { AppCard } from '@/components/ui/app-card';
import { Stack, Container, HStack, IconButton, Show } from '@chakra-ui/react';
import { LuBookmark, LuDownload } from 'react-icons/lu';
import Link from 'next/link';

export default async function PreviewPage() {
	const nextHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: nextHeaders });
	if (!sessionState || !sessionState.documentData) return null;

	const body = { templateName: 'default' as const, documentData: sessionState.documentData };
	const { data } = await DocumentApi.generateDocument({ body, headers: parseHeaders(nextHeaders) });

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
					divideY={'none'}
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
