import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { DecodedJWT } from '@/lib/types';

export const encrypt = (data: string, secretKey: string) => {
	const iv = randomBytes(16);
	const cipher = createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
	let encrypted = cipher.update(data, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (data: string, secretKey: string): string => {
	if (!data || !data.includes(':')) return '';
	const [ivHex, encryptedData] = data.split(':');
	const iv = Buffer.from(ivHex, 'hex');
	const decipher = createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
	let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
};

export const parseHeaders = (headers: ReadonlyHeaders): Record<string, string> => {
	const headersObj: Record<string, string> = {};
	headers.forEach((value, key) => (headersObj[key] = value));
	return headersObj;
};

export const decodeJWT = (token: string): DecodedJWT | null => {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) return null;
		const payload = parts[1];
		const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);
		const base64Payload = paddedPayload.replace(/-/g, '+').replace(/_/g, '/');
		const decodedPayload = Buffer.from(base64Payload, 'base64').toString('utf-8');
		return JSON.parse(decodedPayload) as DecodedJWT;
	} catch (error) {
		console.error('Error decoding JWT:', error);
		return null;
	}
};

export const validateJWT = (token: string | null | undefined): boolean => {
	if (!token) return false;
	const decoded = decodeJWT(token);
	if (!decoded) return false;
	if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return false;
	return true;
};
