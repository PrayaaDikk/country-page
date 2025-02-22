import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-beVietnamPro",
});

export const metadata = {
	title: "Country Page",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="bg-blackTheme">
			<body
				className={`${beVietnamPro.variable} antialiased font-medium`}
			>
				{children}
			</body>
		</html>
	);
}
