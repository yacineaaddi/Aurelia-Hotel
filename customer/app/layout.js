import { ReservationProvider } from "./components/ReservationContext";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import "@/app/_styles/globals.css";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: { template: "%s", default: "Aurelia Hotel" },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful contains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative overflow-x-hidden`}
      >
        <Toaster position="top-center" />
        <Header />
        <div className="">
          <main className="">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
