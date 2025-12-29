import { FC } from 'react';
import { Box, For, HStack, List, StackProps, Text, VStack } from '@chakra-ui/react';
import { ResumeSectionHeading } from './component/heading';
import { DocumentData } from '@/lib/api';

interface ExperienceProps extends StackProps {
	resume: DocumentData;
}

export const Experience: FC<ExperienceProps> = ({ resume, ...props }) => {
	return (
		<VStack align={'start'} width={'full'} {...props}>
			<ResumeSectionHeading>Work Experience</ResumeSectionHeading>
			<VStack width={'full'} gap={3}>
				<For each={resume.experience}>
					{(experience, index) => (
						<VStack key={index} width={'full'} align={'start'}>
							<HStack justify={'space-between'} width={'full'} align={'start'}>
								<Box>
									<Text fontSize={'sm'} fontWeight={'bold'}>
										{experience.role}
									</Text>
									<Text fontSize={'sm'}>{experience.company}</Text>
								</Box>
								<Box>
									<Text fontSize={'xs'}>From: {experience.startDate}</Text>
									<Text fontSize={'xs'}>To: {experience.endDate}</Text>
								</Box>
							</HStack>
							<Box paddingLeft={4}>
								<List.Root as={'ul'}>
									<For each={experience.bullets}>
										{(bullet, index) => (
											<List.Item key={index} fontSize={'xs'} textAlign={'justify'}>
												{bullet}
											</List.Item>
										)}
									</For>
								</List.Root>
							</Box>
						</VStack>
					)}
				</For>
			</VStack>
		</VStack>
	);
};
