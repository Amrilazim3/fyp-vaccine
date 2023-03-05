import { Link } from "@inertiajs/react";
import { useState } from "react";
import ApplicationLogo from "./ApplicationLogo";

export default function Footer() {
    const [mode, setMode] = useState("auto");
    return (
        <div className="pt-12">
            <footer id="footer" className="relative z-50">
                <div className="border-t py-8 flex flex-col justify-center items-center">
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>
                    <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900">
                        2023 Vaccimate. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
