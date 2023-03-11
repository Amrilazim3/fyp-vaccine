import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Child({ foo, ...props }) {
    console.log(props);

    return (
        <>
            <h1>hello world</h1>
        </>
        // <AuthenticatedLayout

        // >

        // </AuthenticatedLayout>
    );
}