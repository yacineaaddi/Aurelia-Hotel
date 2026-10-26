import { ReservationProvider } from "./components/ReservationContext";
import { GuestsProvider } from "./components/GuestsContext";
import { Gilda_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import "@/app/_styles/globals.css";

const gilda = Gilda_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-gilda",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: { template: "%s", default: "Aurelia Hotel" },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful contains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body
        className={`${gilda.variable} ${dmSans.variable} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative overflow-x-hidden`}
      >
        <Toaster position="top-center" />
        <Header />
        <div className="">
          <main className="">
            <ReservationProvider>
              <GuestsProvider>{children}</GuestsProvider>
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
