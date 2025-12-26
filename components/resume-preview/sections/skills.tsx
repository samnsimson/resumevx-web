import { RewriteDocumentResponse } from '@/lib/api';
import { For, HStack, StackProps, Tag, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ResumeSectionHeading } from './component/heading';

interface SkillsProps extends StackProps {
	resume: Omit<RewriteDocumentResponse, 'summary'>;
}

export const Skills: FC<SkillsProps> = ({ resume, ...props }) => {
	return (
		<VStack align={'start'} width={'full'} {...props}>
			<ResumeSectionHeading>Professional Skills</ResumeSectionHeading>
			<HStack flexWrap={'wrap'} gap={2}>
				<For each={resume.skills}>
					{(skill, index) => (
						<Tag.Root colorPalette={'green'} variant={'surface'} key={index}>
							<Tag.Label>{skill}</Tag.Label>
						</Tag.Root>
					)}
				</For>
			</HStack>
		</VStack>
	);
};
