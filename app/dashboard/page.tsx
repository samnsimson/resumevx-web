import { Stack } from '@chakra-ui/react';
import { headers } from 'next/headers';
import { SessionStateApi } from '@/lib/api';
import { ChatAndPreviewComponent } from '@/components/dashboard/chat-and-preview';
import { StarterComponent } from '@/components/dashboard/starter';
import { parseHeaders } from '@/lib/utils';

export default async function DashboardPage() {
	const nextHeaders = await headers();
	const { data: sessionState } = await SessionStateApi.getSessionState({ headers: parseHeaders(nextHeaders) });

	return <Stack boxSize={'full'}>{sessionState ? <ChatAndPreviewComponent sessionState={sessionState} /> : <StarterComponent />}</Stack>;
}
