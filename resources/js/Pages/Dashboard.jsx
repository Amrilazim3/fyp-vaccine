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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                        <div className="container mx-auto pt-8 pb-16 px-4 md:px-8 lg:px-12">
                            <h1 className="text-gray-800 text-xl md:text-2xl font-bold mb-8 md:mb-10">
                                Child Tracking Summary
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
                                        <div className="md:flex md:flex-row md:justify-between">
                                            <div className="flex flex-col md:w-48 lg:w-64">
                                                <h2 className="text-lg lg:text-xl font-medium text-gray-900">
                                                    {child.name}
                                                </h2>
                                                <p className="text-gray-600">
                                                    {child.age} years old
                                                </p>
                                            </div>
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
                                        <hr className="border-gray-300 my-4 md:my-8 lg:my-12" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
