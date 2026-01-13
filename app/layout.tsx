import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import { Poppins, Montserrat } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '600', '800'] });
const montserrat = Montserrat({ variable: '--font-montserrat', subsets: ['latin'], weight: ['400', '600', '700'] });
export const metadata: Metadata = { title: 'Frezume', description: 'Your AI solution for resumes' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${poppins.variable} ${montserrat.variable}`}>
				<Provider>
					{children}
					<Toaster />
				</Provider>
			</body>
		</html>
	);
}
