import { Be_Vietnam_Pro } from "next/font/google";
import "@/app/globals.css";

// Import Google Font
const beVietnamPro = Be_Vietnam_Pro({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-beVietnamPro",
});

// Metadata untuk segment ini (opsional)
export const metadata = {
	title: "Country Details",
	description: "Details about selected country",
};

export default function CountryLayout({ children }) {
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
