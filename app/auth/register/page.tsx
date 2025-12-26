import { RegisterForm } from '@/components/form/register.form';
import { Button, Heading, HStack, Separator, Stack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { LuSend } from 'react-icons/lu';

const LoginPage: FC<PageProps<'/auth/login'>> = () => {
	return (
		<Stack gap={6}>
			<VStack gap={1} align={'start'} mb={6}>
				<Heading size={'4xl'} color={'gray.600'}>
					Create an account
				</Heading>
				<Text color={'GrayText'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error reprehenderit sequi odit, inventore</Text>
			</VStack>
			<RegisterForm />
			<Button variant={'surface'} colorPalette={'gray'} size={'xl'} width={'full'} asChild>
				<Link href={'/auth/login'}>
					<LuSend />
					Login
				</Link>
			</Button>
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
					<Text>Sign up with Goolge</Text>
				</Link>
			</Button>
			<Button variant={'surface'} colorPalette={'blue'} size={'xl'} width={'full'} asChild>
				<Link href={'/auth/password-reset'}>
					<FaFacebook />
					<Text>Sign up with Facebook</Text>
				</Link>
			</Button>
		</Stack>
	);
};
export default LoginPage;
