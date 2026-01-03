'use client';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { DashboardSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { dataInputFormSchema } from '@/lib/schema/data-input-form.schema';
import { useDocumentStore } from '../store/document.store';

interface DataInputFormContext {
	form?: UseFormReturn<DashboardSchema>;
}

const dataInputFormContext = createContext<DataInputFormContext>({});

export const DashboardFormProvider: FC<PropsWithChildren> = ({ children }) => {
	const { formData, setFormData } = useDocumentStore((state) => state);
	const defaultValues = { jobDescription: formData.jobDescription, input: formData.input };
	const form = useForm<DashboardSchema>({ mode: 'onChange', resolver: zodResolver(dataInputFormSchema), defaultValues });

	form.subscribe({
		name: ['jobDescription', 'input'],
		callback: ({ values }) => setFormData({ jobDescription: values.jobDescription, input: values.input }),
	});

	return <dataInputFormContext.Provider value={{ form }}>{children}</dataInputFormContext.Provider>;
};

export const useDataInputForm = () => {
	const context = useContext(dataInputFormContext);
	if (!context) throw new Error('useDataInputForm must be used within a DashboardFormProvider');
	return context;
};
