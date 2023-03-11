import ContentContainer from "@/Components/ContentContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const vaccines = [
    { name: "Pfizer-BioNTech", taken: true },
    { name: "Moderna", taken: false },
    { name: "Johnson & Johnson", taken: true },
    { name: "Wak imah", taken: true },
    { name: "Haji kasmiran", taken: true },
    { name: "Cik pendek", taken: true },
    { name: "Cik osman", taken: true },
    { name: "Lek mujeri", taken: true },
    { name: "NOnor", taken: true },
    { name: "Norita sidek", taken: true },
    { name: "Rahim kadri", taken: true },
];

export default function Child({ foo, name, ...props }) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vaccine Schedule
                </h2>
            }
        >
            <Head title="Tracking" />

            <ContentContainer>
                <h1 className="sm:text-lg md:text-xl text-2xl font-semibold mb-4">{name}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {vaccines.map((vaccine, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-md border-2 border-gray-300 p-4"
                        >
                            <h2 className="text-md font-bold mb-2">
                                {vaccine.name}
                            </h2>
                            <p className="text-gray-700">
                                {vaccine.taken ? "Taken" : "Not Taken"}
                            </p>
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </AuthenticatedLayout>
    );
}
