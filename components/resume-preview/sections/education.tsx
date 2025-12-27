import { FC } from 'react';
import { DocumentData } from '@/lib/api';
import { VStack, For, StackProps, Text, HStack, Box } from '@chakra-ui/react';
import { ResumeSectionHeading } from './component/heading';

interface EducationProps extends StackProps {
	resume: DocumentData;
}

export const Education: FC<EducationProps> = ({ resume, ...props }) => {
	return (
		<VStack align={'start'} width={'full'} {...props}>
			<ResumeSectionHeading>Education</ResumeSectionHeading>
			<VStack align={'start'} width={'full'} gap={3}>
				<For each={resume.education}>
					{(education, index) => (
						<HStack justify={'space-between'} width={'full'}>
							<VStack key={index} align={'start'} gap={0}>
								<Text fontSize={'sm'} fontWeight={'bold'}>
									{education.institution}
								</Text>
								<Text fontSize={'sm'}>{education.degree}</Text>
							</VStack>
							<Box>
								<Text fontSize={'xs'}>{education.year}</Text>
							</Box>
						</HStack>
					)}
				</For>
			</VStack>
		</VStack>
	);
};
