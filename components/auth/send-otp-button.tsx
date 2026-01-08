'use client';
import { AuthApi } from '@/lib/api';
import { Button, ButtonProps } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';

interface SendOtpButtonProps extends ButtonProps {
	[x: string]: any;
}

export const SendOtpButton: FC<SendOtpButtonProps> = ({ ...props }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const sendOtp = async () => {
		try {
			setIsLoading(true);
			const { error } = await AuthApi.sendVerificationOtp();
			if (error as any) throw new Error((error as any).detail || 'Failed to resend OTP');
			toaster.success({ title: 'OTP sent successfully', description: 'You will receive an OTP in your email', closable: true });
			router.replace('/auth/verify-email?state=fresh');
		} catch (error: any) {
			console.error(error);
			toaster.error({ title: 'Failed to send OTP', description: error.detail, closable: true });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button variant={'solid'} colorPalette={'blue'} size={'xl'} loading={isLoading} disabled={isLoading} onClick={sendOtp} {...props}>
			Send verification OTP
		</Button>
	);
};
