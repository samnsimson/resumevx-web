import { GradientBackground } from '@/components/ui/auth-gradient';
import { Container, GridItem, SimpleGrid, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const AuthLayout: FC<LayoutProps<'/auth'>> = ({ children }) => {
	return (
		<SimpleGrid columns={12} width={'full'} height={'100vh'}>
			<GridItem colSpan={7} height={'full'}>
				<GradientBackground />
			</GridItem>
			<GridItem colSpan={5} backgroundColor={'bg.panel'} height={'full'} shadow={'lg'}>
				<Container maxWidth={'lg'} height={'full'}>
					<VStack justify={'center'} height={'full'}>
						{children}
					</VStack>
				</Container>
			</GridItem>
		</SimpleGrid>
	);
};
export default AuthLayout;
