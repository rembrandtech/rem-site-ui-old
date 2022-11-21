import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

interface DefaultTemplateProps {
  children: React.ReactNode;
}

export function DefaultTemplate({ children }: DefaultTemplateProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
