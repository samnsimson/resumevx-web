import { ColorModeButton } from '@/components/ui/color-mode-button';
import { Button, Heading, HStack } from '@chakra-ui/react';

export default function Home() {
	return (
		<HStack>
			<Heading>Heading</Heading>
			<Button>Button 1</Button>
			<ColorModeButton />
		</HStack>
	);
}
