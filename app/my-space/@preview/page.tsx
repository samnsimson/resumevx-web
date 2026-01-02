'use client';
import { AppCard } from '@/components/ui/app-card';
import { StartOverButton } from '@/components/my-space/start-over-button';

export default function PreviewPage({}: PageProps<'/my-space'>) {
	return (
		<AppCard
			title="Preview"
			description="Preview your resume and make changes"
			bg={'transparent'}
			rounded={'none'}
			border={'none'}
			actions={<StartOverButton />}
		>
			Preview Page
		</AppCard>
	);
}
