import { AppCard } from '@/components/ui/app-card';
import { StartOverButton } from '@/components/dashboard/start-over-button';
import { headers } from 'next/headers';
import { DocumentApi, SessionStateApi } from '@/lib/api';
import { parseHeaders } from '@/lib/utils';
import { ResumePreview } from '@/components/resume-preview';
import { Container, HStack, IconButton, Show, Stack } from '@chakra-ui/react';
import { LuBookmark, LuDownload } from 'react-icons/lu';

export default async function PreviewPage({ searchParams }: PageProps<'/dashboard'>) {
	const params = await searchParams;
	const requestHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: parseHeaders(requestHeaders) });
	if (!sessionState || !sessionState.documentData) return null;
	const body = { templateName: 'default' as const, documentData: sessionState.documentData };
	const { data } = await DocumentApi.generateDocument({ body, headers: parseHeaders(requestHeaders) });

	console.log('searchParams', params);

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
							<IconButton variant={'surface'} colorPalette={'blue'} rounded={'full'} size={'lg'}>
								<LuDownload />
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
