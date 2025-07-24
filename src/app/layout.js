import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "CREADIFF - More than a yearbook, we tell your school's story",
  description: "CREADIFF adalah sebuah rumah produksi dibawah naungan PT. BAYU PRIMA WISATA, dan berafiliasi ATHA PHOTO STUDIO. Yang sudah bergerak sejak 2019.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
