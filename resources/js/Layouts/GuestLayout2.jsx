import Footer from "@/Components/Footer";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const navLinks = [
    { id: 1, name: "terms of service" },
    { id: 3, name: "privacy policy" },
    { id: 2, name: "about" },
    { id: 4, name: "team" },
    { id: 5, name: "login" },
    { id: 6, name: "register" },
];

export default function GuestLayout2({ children }) {
    const [show, setShow] = useState(false);

    return (
        <div
            className="bg-gray-100 overflow-y-hidden"
            style={{ minHeight: 700 }}
        >
            <nav className="w-full border-b">
                <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
                    <div aria-label="Application Logo" role="img">
                        <Link href="/" className="flex space-x-2">
                            <ApplicationLogo />
                            <h3 className="self-center text-md text-indigo-800 font-semibold">vaccimate</h3>
                        </Link>
                    </div>
                    <div>
                        <button
                            onClick={() => setShow(!show)}
                            className={`${
                                show ? "hidden" : ""
                            } sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                        >
                            <svg
                                aria-haspopup="true"
                                aria-label="open Main Menu"
                                xmlns="http://www.w3.org/2000/svg"
                                className="md:hidden icon icon-tabler icon-tabler-menu"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#2c3e50"
                                fill="none"
                                strokeLinecap="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={4} y1={8} x2={20} y2={8} />
                                <line x1={4} y1={16} x2={20} y2={16} />
                            </svg>
                        </button>
                        <div
                            id="menu"
                            className={` ${
                                show ? "" : "hidden"
                            } md:block lg:block `}
                        >
                            <button
                                onClick={() => setShow(!show)}
                                className={`block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 right-4 mt-6`}
                            >
                                <svg
                                    aria-label="close main menu"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#2c3e50"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </button>
                            <ul className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20">
                                {navLinks.map((link) => {
                                    let hyphenedName = link.name.replace(
                                        /\s+/g,
                                        "-"
                                    );

                                    return (
                                        <li
                                            key={link.id}
                                            className={` ${
                                                link.name == "login" ||
                                                link.name == "register"
                                                    ? "text-indigo-700 hover:text-indigo-900 md:hidden pt-10"
                                                    : "text-gray-700 hover:text-indigo-700 lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10"
                                            } 
                                            ${
                                                usePage().props.ziggy.location.includes(
                                                    hyphenedName
                                                )
                                                    ? "text-indigo-700"
                                                    : ""
                                            }
                                            cursor-pointer text-base `}
                                        >
                                            <Link
                                                href={route(hyphenedName)}
                                                className="capitalize"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="hidden md:flex md:space-x-4 lg:space-x-8">
                        <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-6 py-1 sm:py-2 text-sm">
                            <Link href={route("login")}>login</Link>
                        </button>
                        <button className="bg-gray-700 focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-500 rounded border border-gray-700 text-white px-4 sm:px-6 py-1 sm:py-2 text-sm">
                            <Link href={route("register")}>Register</Link>
                        </button>
                    </div>
                </div>
            </nav>

            {children}

            <Footer />
        </div>
    );
}
