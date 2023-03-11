import ContentContainer from "@/Components/ContentContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const children = [
    {
        id: 1,
        name: "Sarah",
        age: 3,
        completedPercentage: 80,
        nextVaccination: "April 2023",
    },
    {
        id: 2,
        name: "John",
        age: 5,
        completedPercentage: 60,
        nextVaccination: "June 2023",
    },
    {
        id: 3,
        name: "Emily",
        age: 2,
        completedPercentage: 90,
        nextVaccination: "May 2023",
    },
];

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <ContentContainer>
                {/* if user doesn't register any children */}
                {/* <div className="flex flex-col justify-center p-6 items-center h-96">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        You don't have any children registered yet!
                    </h1>
                    <a
                        href="/register"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Register your child now!
                    </a>
                </div> */}
                {/* if user already has children registered */}
                <div>
                    <h1 className="text-gray-800 text-xl md:text-2xl font-bold mb-4 md:mb-6">
                        Vaccination Summary
                    </h1>
                    <ul className="bg-gray-100 p-4 md:p-8 lg:p-12 rounded-lg">
                        {children.map((child, index) => (
                            <li
                                key={child.id}
                                className="mb-4 md:mb-8 lg:mb-12"
                            >
                                <div className="text-indigo-500 text-sm">
                                    Child #{index + 1}
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <h2 className="text-lg lg:text-xl font-medium text-gray-900">
                                                {child.name}
                                            </h2>
                                            <p className="text-gray-600">
                                                {child.age} years old
                                            </p>
                                        </div>
                                        <button className="text-sm font-semibold rounded-md px-5 text-white bg-indigo-500 hover:bg-indigo-400">
                                            view
                                        </button>
                                    </div>
                                    <div className="md:flex md:mt-4 md:space-x-10">
                                        <div className="mt-4 md:mt-0">
                                            <p className="text-gray-600">
                                                Completed percentage:
                                            </p>
                                            <p className="text-gray-900 font-medium">
                                                {child.completedPercentage}%
                                            </p>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <p className="text-gray-600">
                                                Next vaccination:
                                            </p>
                                            <p className="text-gray-900 font-medium">
                                                {child.nextVaccination}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-gray-300 my-4 md:my-8 lg:my-12" />
                            </li>
                        ))}
                    </ul>
                </div>
            </ContentContainer>
        </AuthenticatedLayout>
    );
}
