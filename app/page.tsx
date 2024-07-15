import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
        <section className="w-full h-screen bg-secondary-100 p-6">
          <p>HomePage</p>
        </section>
      <Footer />
    </>
  );
}
