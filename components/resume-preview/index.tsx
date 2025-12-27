'use client';
import { FC } from 'react';
import { Show, Stack, StackProps, VStack } from '@chakra-ui/react';
import { SectionTitle } from '../ui/section-title';
import { LuZap } from 'react-icons/lu';
import { useDocumentStore } from '@/lib/store/document.store';
import { NoDataPlaceholder } from './no-data-palceholder';
import { Bio } from './sections/bio';
import { Summary } from './sections/summary';
import { Skills } from './sections/skills';
import { Experience } from './sections/experience';
import { Education } from './sections/education';

interface ResumePreviewProps extends StackProps {
	activeDocumentPath: string | null;
}

export const ResumePreview: FC<ResumePreviewProps> = ({ ...props }) => {
	const { resumeData } = useDocumentStore((state) => state);
	return (
		<VStack height={'full'} width={'full'} overflow={'hidden'} {...props}>
			<SectionTitle title="Preview" description="Preview of your result" icon={LuZap} />
			<Stack
				flex={1}
				minHeight={0}
				width={'full'}
				height={'full'}
				bg={'bg.muted'}
				rounded={'lg'}
				border={'1px solid'}
				borderColor={'border.emphasized'}
				padding={3}
			>
				<Show when={!resumeData}>
					<NoDataPlaceholder />
				</Show>
				<Show when={resumeData}>
					{(resume) => (
						<VStack width={'full'} height={'full'} overflow={'scroll'} gap={4}>
							<Bio resume={resume} />
							<Summary resume={resume} />
							<Skills resume={resume} />
							<Experience resume={resume} />
							<Education resume={resume} />
						</VStack>
					)}
				</Show>
			</Stack>
		</VStack>
	);
};
