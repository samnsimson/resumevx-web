'use client';
import { FC } from 'react';
import { Alert, Box, For, HStack, Image, Link, RadioCard, RadioCardRootProps, Show, Mark } from '@chakra-ui/react';
import { useAccessControl } from '../providers/access-control.provider';
import { LuRocket } from 'react-icons/lu';

interface TemplateSelectorProps extends RadioCardRootProps {
	templates: string[];
}

export const TemplateSelector: FC<TemplateSelectorProps> = ({ templates, ...props }) => {
	const { isFreePlan } = useAccessControl();
	return (
		<RadioCard.Root variant={'outline'} colorPalette={'red'} gap={4} defaultValue={'default'} {...props}>
			<RadioCard.Item value={'default'}>
				<RadioCard.ItemHiddenInput />
				<RadioCard.ItemControl>
					<RadioCard.ItemContent>
						<HStack align={'start'}>
							<Image src={'pdf.svg'} alt="pdf icon" boxSize={'42px'} />
							<Box>
								<RadioCard.ItemText fontWeight={'bold'}>Default</RadioCard.ItemText>
								<RadioCard.ItemDescription>Brief description of the template</RadioCard.ItemDescription>
							</Box>
						</HStack>
					</RadioCard.ItemContent>
					<RadioCard.ItemIndicator />
				</RadioCard.ItemControl>
			</RadioCard.Item>
			<Show when={isFreePlan}>
				<Alert.Root status="info">
					<Alert.Indicator>
						<LuRocket />
					</Alert.Indicator>
					<Alert.Content color="fg">
						<Alert.Title color={{ _light: 'blue.700', _dark: 'blue.300' }}>
							<Mark textDecoration={'underline'} textUnderlineOffset={'2px'} marginRight={1} asChild>
								<Link href="/dashboard/subscription">Upgrade</Link>
							</Mark>
							your plan to get access to all templates
						</Alert.Title>
					</Alert.Content>
				</Alert.Root>
			</Show>
			<For each={templates}>
				{(template) => {
					const isTemplateDisabled = isFreePlan && template.toLowerCase() !== 'default';
					return (
						<RadioCard.Item value={template.toLowerCase()} key={template} disabled={isTemplateDisabled}>
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
					);
				}}
			</For>
		</RadioCard.Root>
	);
};
