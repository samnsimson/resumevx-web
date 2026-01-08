import { decrypt, encrypt } from '@/lib/utils';
import { StateStorage } from 'zustand/middleware';

export const createEncryptedStorage = (): StateStorage => {
	if (typeof window === 'undefined') return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
	const secretKey = '5072cf29953b9510bd2ab837f5b0763400c791e113b6c9732cccfee401edfd23';

	return {
		getItem: (name: string): string | null => {
			const encryptedValue = sessionStorage.getItem(name);
			if (!encryptedValue) return null;
			try {
				return decrypt(encryptedValue, secretKey);
			} catch (error) {
				console.error('Error decrypting or parsing data:', error);
				return null;
			}
		},
		setItem: (name: string, value: string): void => {
			try {
				const jsonString = JSON.stringify(value);
				const encryptedValue = encrypt(jsonString, secretKey);
				return sessionStorage.setItem(name, encryptedValue);
			} catch (error) {
				console.error('Error encrypting or stringifying data:', error);
			}
		},
		removeItem: (name: string): void => {
			return sessionStorage.removeItem(name);
		},
	};
};
