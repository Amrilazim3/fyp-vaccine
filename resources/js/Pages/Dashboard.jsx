import ChildrenForm from "@/Components/ChildrenForm";
import ContentContainer from "@/Components/ContentContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ children, ...props }) {
    const [isOpenChildrenForm, setIsOpenChildrenForm] = useState(false);

    const handleOnClickAddChildrenButtton = () => {
        setIsOpenChildrenForm(!isOpenChildrenForm);
    };

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
                {children.length == 0 && (
                    <div className="flex flex-col justify-center p-6 items-center h-96">
                        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            You don't have any children registered yet!
                        </h1>
                        <button
                            type="button"
                            onClick={handleOnClickAddChildrenButtton}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Register your child now!
                        </button>
                    </div>
                )}

                {children.length > 0 && (
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
                                                    {child.age_in_months <=
                                                    12
                                                        ? Math.floor(child.age_in_months) + " months old"
                                                        : Math.floor(child.age_in_months /
                                                              12) +
                                                          " years old"}
                                                </p>
                                            </div>
                                            <button className="text-sm font-semibold rounded-md px-5 text-white bg-indigo-500 hover:bg-indigo-400">
                                                <Link
                                                    href={
                                                        "children/" + child.id
                                                    }
                                                >
                                                    view
                                                </Link>
                                            </button>
                                        </div>
                                        <div className="md:flex md:mt-4 md:space-x-10">
                                            <div className="mt-4 md:mt-0">
                                                <p className="text-gray-600">
                                                    Percentage Completed:
                                                </p>
                                                <p className="text-gray-900 font-medium">
                                                    {child.percentage_completed}
                                                </p>
                                            </div>
                                            <div className="mt-4 md:mt-0">
                                                <p className="text-gray-600">
                                                    Next vaccination:
                                                </p>
                                                <p className="text-gray-900 font-medium">
                                                    {child.next_vaccination_info.name} ({child.next_vaccination_info.date})
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-gray-300 my-4 md:my-8 lg:my-12" />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </ContentContainer>

            {isOpenChildrenForm && (
                <ChildrenForm
                    isOpen={isOpenChildrenForm}
                    handleOnClose={
                        handleOnClickAddChildrenButtton
                    }
                />
            )}
        </AuthenticatedLayout>
    );
}
