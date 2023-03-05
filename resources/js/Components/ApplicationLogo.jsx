import { usePage } from "@inertiajs/react";

export default function ApplicationLogo() {
    return (
        <>
            <img
                className="h-12"
                src={`${usePage().props.ziggy.url}/resources/logo.svg`}
                alt="logo"
            />
        </>
    );
}
