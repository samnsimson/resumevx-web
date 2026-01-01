import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

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
