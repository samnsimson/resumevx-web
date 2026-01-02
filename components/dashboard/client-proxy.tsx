'use client';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useDocumentStore } from '@/lib/store/document.store';

import { useEffect } from 'react';

export function ClientProxy({ children }: PropsWithChildren) {
	const router = useRouter();
	const { formData } = useDocumentStore();

	useEffect(() => {
		console.log(formData);
	}, [formData, router]);

	return children;
}
