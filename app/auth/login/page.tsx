import { LoginForm } from '@/components/form/login.form';
import { Button, Heading, HStack, Separator, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { LuRefreshCcw, LuUserPlus } from 'react-icons/lu';

const LoginPage: FC<PageProps<'/auth/login'>> = () => {
	return (
		<Stack gap={6}>
			<VStack gap={1} align={'start'} mb={6}>
				<Heading size={'4xl'} color={'gray.600'}>
					Welcome Back!
				</Heading>
				<Text color={'GrayText'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error reprehenderit sequi odit, inventore</Text>
			</VStack>
			<LoginForm />
			<SimpleGrid columns={2} gap={4}>
				<Button variant={'surface'} colorPalette={'gray'} size={'xl'} width={'full'} asChild>
					<Link href={'/auth/register'}>
						<LuUserPlus />
						Register
					</Link>
				</Button>
				<Button variant={'surface'} colorPalette={'gray'} size={'xl'} width={'full'} asChild>
					<Link href={'/auth/password-reset'}>
						<LuRefreshCcw />
						Reset password
					</Link>
				</Button>
			</SimpleGrid>
			<HStack>
				<Separator flex="1" />
				<Text flexShrink="0" color={'GrayText'}>
					or
				</Text>
				<Separator flex="1" />
			</HStack>
			<Button variant={'surface'} colorPalette={'red'} size={'xl'} width={'full'} asChild>
				<Link href={'/auth/password-reset'}>
					<FaGoogle />
					<Text>Sign in with Goolge</Text>
				</Link>
			</Button>
			<Button variant={'surface'} colorPalette={'blue'} size={'xl'} width={'full'} asChild>
				<Link href={'/auth/password-reset'}>
					<FaFacebook />
					<Text>Sign in with Facebook</Text>
				</Link>
			</Button>
		</Stack>
	);
};
export default LoginPage;
