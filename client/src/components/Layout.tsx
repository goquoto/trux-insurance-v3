import Header from "./Header";
import Footer from "./Footer";
import MobileCTABar from "./MobileCTABar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <Footer />
      <MobileCTABar />
      {/* Spacer for mobile CTA bar */}
      <div className="h-[52px] lg:hidden" />
    </div>
  );
}
