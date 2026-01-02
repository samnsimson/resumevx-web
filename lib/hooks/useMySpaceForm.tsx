'use client';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { MySpaceSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { workspaceSchema } from '@/lib/schema/workspace.schema';
import { useDocumentStore } from '../store/document.store';

interface MySpaceFormContext {
	form?: UseFormReturn<MySpaceSchema>;
}

const workspaceFormContext = createContext<MySpaceFormContext>({});

export const MySpaceFormProvider: FC<PropsWithChildren> = ({ children }) => {
	const { formData, setFormData } = useDocumentStore((state) => state);
	const defaultValues = { jobDescription: formData.jobDescription, input: formData.input };
	const form = useForm<MySpaceSchema>({ mode: 'onChange', resolver: zodResolver(workspaceSchema), defaultValues });

	form.subscribe({
		name: ['jobDescription', 'input'],
		callback: ({ values }) => setFormData({ jobDescription: values.jobDescription, input: values.input }),
	});

	return <workspaceFormContext.Provider value={{ form }}>{children}</workspaceFormContext.Provider>;
};

export const useMySpaceForm = () => {
	const context = useContext(workspaceFormContext);
	if (!context) throw new Error('useMySpaceForm must be used within a MySpaceFormProvider');
	return context;
};
