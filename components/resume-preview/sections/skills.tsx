import { DocumentData } from '@/lib/api';
import { StackProps, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ResumeSectionHeading } from './component/heading';

interface SkillsProps extends StackProps {
	resume: DocumentData;
}

export const Skills: FC<SkillsProps> = ({ resume, ...props }) => {
	return (
		<VStack align={'start'} width={'full'} {...props}>
			<ResumeSectionHeading>Professional Skills</ResumeSectionHeading>
			<Text fontSize={'xs'} textAlign={'justify'}>
				{resume.skills.join(' - ')}
			</Text>
			{/* <HStack flexWrap={'wrap'} gap={2}>
				<For each={resume.skills}>
					{(skill, index) => (
						<Tag.Root colorPalette={'green'} variant={'surface'} key={index}>
							<Tag.Label>{skill}</Tag.Label>
						</Tag.Root>
					)}
				</For>
			</HStack> */}
		</VStack>
	);
};
