import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Agreements from "../components/home/Agreements";
import HowItWorks from "../components/home/HowItWorks";
import About from "../components/home/About";
import Security from "../components/home/Security";
import Install from "../components/home/Install";
import Contact from "../components/home/Contact";
import Footer from "../components/layout/Footer";
import samsLogo from "../assets/images/sams-logo.png";
import "../styles/home.css";

function Home() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="home-page">
      <Navbar scrollToSection={scrollToSection} />

      <Hero scrollToSection={scrollToSection} />

      <Agreements />

      <HowItWorks />

      <About scrollToSection={scrollToSection} />

      <Security />

      <Install />

      <Contact />

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default Home;