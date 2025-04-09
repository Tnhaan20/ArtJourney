import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[#1c1c1c]">{children}</main>
      <Footer />
    </div>
  );
}