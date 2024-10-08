import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Club Aleman Dashboard',
	description: 'Dashboard for Club Aleman Puerto Montt',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<div className='flex flex-col h-screen'>
						<div className='flex-1'>{children}</div>
					</div>
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}
