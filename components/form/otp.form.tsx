'use client';
import { FC } from 'react';
import { OtpSchema } from '@/lib/types';
import { Button, Field, PinInput, Stack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { otpSchema } from '@/lib/schema/auth.schema';
import { AuthApi } from '@/lib/api';
import { toaster } from '../ui/toaster';
import { redirect } from 'next/navigation';

interface OtpFormProps {
	[x: string]: any;
}

export const OtpForm: FC<OtpFormProps> = ({ identifier }) => {
	const form = useForm<OtpSchema>({ mode: 'onChange', resolver: standardSchemaResolver(otpSchema), defaultValues: { otp: [] } });

	const onSubmit = async ({ otp }: OtpSchema) => {
		const { data, error } = await AuthApi.verifyEmail({ body: { token: otp.join(''), identifier } });
		if (error) toaster.error({ title: 'Verification failed', description: error.detail, closable: true });
		if (data && data.status === 'success') redirect('/dashboard');
	};
	return (
		<Stack align={'center'} asChild>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Field.Root invalid={!!form.formState.errors.otp}>
					<Controller
						name="otp"
						control={form.control}
						render={({ field }) => (
							<PinInput.Root
								otp={true}
								size={'xl'}
								variant={'subtle'}
								colorPalette={'blue'}
								width={'full'}
								marginY={4}
								value={field.value}
								onValueChange={(e) => field.onChange(e.value)}
							>
								<PinInput.HiddenInput />
								<PinInput.Control>
									<PinInput.Input index={0} />
									<PinInput.Input index={1} />
									<PinInput.Input index={2} />
									<PinInput.Input index={3} />
									<PinInput.Input index={4} />
									<PinInput.Input index={5} />
								</PinInput.Control>
							</PinInput.Root>
						)}
					/>
					<Field.ErrorText>{form.formState.errors.otp?.message}</Field.ErrorText>
				</Field.Root>
				<Button
					type="submit"
					variant={'solid'}
					colorPalette={'blue'}
					size={'xl'}
					loading={form.formState.isSubmitting}
					disabled={!form.formState.isValid}
				>
					Verify Email
				</Button>
			</form>
		</Stack>
	);
};
