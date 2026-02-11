import { Raleway } from "next/font/google";
import "../styles";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${raleway.variable} antialiased transition-all duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
