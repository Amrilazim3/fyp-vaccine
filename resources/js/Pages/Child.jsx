import ContentContainer from "@/Components/ContentContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Child({ foo, name, ...props }) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {name}'s Tracking
                </h2>
            }
        >
            <Head title="Tracking" />

            <ContentContainer>
                <h1>Hello world</h1>
            </ContentContainer>
        </AuthenticatedLayout>
    );
}
