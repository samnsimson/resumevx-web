import { GradientBackground } from '@/components/ui/auth-gradient';
import { Container, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const AuthLayout: FC<LayoutProps<'/auth'>> = ({ children }) => {
	return (
		<GradientBackground>
			<VStack justify={'center'} height={'full'}>
				<Container maxWidth={'lg'} bg={'bg.panel'} padding={6} borderRadius={'lg'} shadow={'lg'}>
					{children}
				</Container>
			</VStack>
		</GradientBackground>
	);
};
export default AuthLayout;
