'use client';
import { FC } from 'react';
import { Box, For, HStack, Image, RadioCard, RadioCardRootProps } from '@chakra-ui/react';

interface TemplateSelectorProps extends RadioCardRootProps {
	templates: string[];
}

export const TemplateSelector: FC<TemplateSelectorProps> = ({ templates, ...props }) => {
	return (
		<RadioCard.Root variant={'outline'} colorPalette={'red'} gap={4} defaultValue={'default'} {...props}>
			<For each={templates}>
				{(template) => (
					<RadioCard.Item value={template.toLowerCase()} key={template}>
						<RadioCard.ItemHiddenInput />
						<RadioCard.ItemControl>
							<RadioCard.ItemContent>
								<HStack align={'start'}>
									<Image src={'pdf.svg'} alt="pdf icon" boxSize={'42px'} />
									<Box>
										<RadioCard.ItemText fontWeight={'bold'}>{template}</RadioCard.ItemText>
										<RadioCard.ItemDescription>Brief description of the template</RadioCard.ItemDescription>
									</Box>
								</HStack>
							</RadioCard.ItemContent>
							<RadioCard.ItemIndicator />
						</RadioCard.ItemControl>
					</RadioCard.Item>
				)}
			</For>
		</RadioCard.Root>
	);
};
