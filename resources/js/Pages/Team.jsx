import GuestLayout2 from "@/Layouts/GuestLayout2";
import { Head } from "@inertiajs/react";

function Team() {
    return (
        <>
            <Head title="Team" />
            <GuestLayout2>
                <div>
                    <div className="container flex justify-center mx-auto pt-16">
                        <div>
                            <p className="text-gray-500 text-lg text-center font-normal pb-3">
                                BUILDING TEAM
                            </p>
                            <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
                                The Talented People Behind the Scenes of the
                                Organization
                            </h1>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 px-10 pt-10">
                        <div className="container mx-auto">
                            <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                    <div className="rounded overflow-hidden shadow-md bg-white">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <img
                                                    src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif"
                                                    alt
                                                    className="rounded-full object-cover h-full w-full shadow-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-6 mt-16">
                                            <div className="font-bold text-3xl text-center pb-1">
                                                Andres Berlin
                                            </div>
                                            <p className="text-gray-800 text-sm text-center">
                                                Chief Executive Officer
                                            </p>
                                            <p className="text-center text-gray-600 text-base pt-3 pb-6 font-normal">
                                                The CEO's role in raising a
                                                company's corporate IQ is to
                                                establish an atmosphere that
                                                promotes knowledge sharing and
                                                collaboration.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                    <div className="rounded overflow-hidden shadow-md bg-white">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <img
                                                    src="https://cdn.tuk.dev/assets/photo-1530577197743-7adf14294584.jfif"
                                                    alt
                                                    className="rounded-full object-cover h-full w-full shadow-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-6 mt-16">
                                            <div className="font-bold text-3xl text-center pb-1">
                                                Silene Tokyo
                                            </div>
                                            <p className="text-gray-800 text-sm text-center">
                                                Product Design Head
                                            </p>
                                            <p className="text-center text-gray-600 text-base pt-3 pb-6 font-normal">
                                                The emphasis on innovation and
                                                technology in our companies has
                                                resulted in a few of them
                                                establishing global benchmarks in
                                                product design and development.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                    <div className="rounded overflow-hidden shadow-md bg-white">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <img
                                                    src="https://cdn.tuk.dev/assets/photo-1566753323558-f4e0952af115.jfif"
                                                    alt
                                                    className="rounded-full object-cover h-full w-full shadow-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-6 mt-16">
                                            <div className="font-bold text-3xl text-center pb-1">
                                                Johnson Stone
                                            </div>
                                            <p className="text-gray-800 text-sm text-center">
                                                Manager Development
                                            </p>
                                            <p className="text-center text-gray-600 text-base pt-3 pb-6 font-normal">
                                                Our services encompass the
                                                assessment and repair of property
                                                damage caused by water, fire, smoke,
                                                or mold. We can also be a part of
                                                the restoration.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                    <div className="rounded overflow-hidden shadow-md bg-white">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <img
                                                    src="https://cdn.tuk.dev/assets/boy-smiling_23-2148155640.jpg"
                                                    alt
                                                    className="rounded-full object-cover h-full w-full shadow-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-6 mt-16">
                                            <div className="font-bold text-3xl text-center pb-1">
                                                Dean Jones
                                            </div>
                                            <p className="text-gray-800 text-sm text-center">
                                                Principal Software Engineer
                                            </p>
                                            <p className="text-center text-gray-600 text-base pt-3 pb-6 font-normal">
                                                An avid open-source developer who
                                                loves to be creative and inventive.
                                                I have 20 years of experience in the
                                                field.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout2>
        </>
    );
}

export default Team;
