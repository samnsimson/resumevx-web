import { Box, Heading, Mark, Text, VStack } from '@chakra-ui/react';
import { OtpForm } from '@/components/form/otp.form';
import { ResendOtpButton } from '@/components/auth/resent-otp-button';
import { SendOtpButton } from '@/components/auth/send-otp-button';
import { AuthApi } from '@/lib/api';
import { headers } from 'next/headers';
import { parseHeaders } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function VerifyEmailPage({ searchParams }: PageProps<'/auth/verify-email'>) {
	const sp = await searchParams;
	const nextHeaders = await headers();
	const { data } = await AuthApi.getSession({ headers: parseHeaders(nextHeaders) });
	if (!data) return redirect('/auth/login');
	if (data.user.emailVerified) return redirect('/dashboard');

	return (
		<VStack boxSize={'full'} textAlign={'center'}>
			<Heading>Verify your email</Heading>
			{sp.state === 'fresh' ? (
				<Box marginY={4} spaceY={4}>
					<Text color={'GrayText'}>
						A verification code has been sent to your email.
						<br />
						Please enter it below to verify.
					</Text>
					<OtpForm identifier={'email'} />
					<ResendOtpButton />
				</Box>
			) : (
				<Box marginY={4} spaceY={4}>
					<Text color={'GrayText'}>
						Your email
						<Mark color={'blue.500'} fontWeight={'bold'} marginX={1}>
							{data.user.email}
						</Mark>
						is not verified. <br />
						Please verify your email to continue
					</Text>
					<SendOtpButton />
				</Box>
			)}
		</VStack>
	);
}
