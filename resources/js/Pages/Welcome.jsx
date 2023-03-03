import Contact from "@/Components/Contact";
import Faq from "@/Components/Faq";
import Feature from "@/Components/Feature";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Testimonial from "@/Components/Testimonial";
import { Head } from "@inertiajs/react";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div
                className="bg-gray-100 pb-12 overflow-y-hidden"
                style={{ minHeight: 700 }}
            >
                <Hero />
                <Feature />
                <Testimonial />
                <Faq />
                <Contact />
                <Footer />
            </div>
        </>
    );
}
