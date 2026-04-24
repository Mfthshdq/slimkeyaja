import Footer from "../Component/Footer/Footer";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import HeroPage from "./HeroPage";
import NavbarPage from "./NavbarPage";
import ServicePage from "./ServicePage";
import WhyChooseUsPage from "./WhyChooseUsPage";

function LandingPage() {
    return (
        <div>
            <NavbarPage />
            <section id="home">
                <HeroPage />
            </section>
            <section id="layanan">
                <ServicePage />
            </section>
            <section id="keunggulan">
                <WhyChooseUsPage />
            </section>
            <section id="tentang">
                <AboutPage />
            </section>
            <section id="kontak">
                <ContactPage />
            </section>
            <Footer />
        </div>
    )
}

export default LandingPage;