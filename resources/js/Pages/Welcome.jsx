import Contact from "@/Components/Contact";
import Faq from "@/Components/Faq";
import Feature from "@/Components/Feature";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Testimonial from "@/Components/Testimonial";
import GuestLayout2 from "@/Layouts/GuestLayout2";
import { Head } from "@inertiajs/react";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <GuestLayout2>
                <Hero />
                <Feature />
                <Testimonial />
                <Faq />
                <Contact />
            </GuestLayout2>
        </>
    );
}
