import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsShowcase from "@/components/ProductShowCase";
import ContactDetails from "@/components/Contact";
import PhotoCarousel from "@/components/PhotoCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductsShowcase />
        <ContactDetails />
        <PhotoCarousel />
      </main>
      <Footer />
    </>
  );
}