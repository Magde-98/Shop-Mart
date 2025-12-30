import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Navbar from "./_component/navbar/page";
import { Toaster } from "@/components/ui/sonner"
import MySessionProvider from "./_component/MySessionProvider/MySessionProvider";
import { CartContextProvider } from "./context/cartContext";
import Footer from "./_component/footer/page";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <MySessionProvider>
          <CartContextProvider>
            <Navbar />
            {children}
            <Footer />
          </CartContextProvider>
          <Toaster />

        </MySessionProvider>

      </body>
    </html>
  );
}
