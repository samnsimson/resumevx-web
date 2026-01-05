export const cleanText = (text: string | null | undefined) => {
	if (!text) return null;
	return text.replace(/<[^>]*>?/g, '').trim();
};
