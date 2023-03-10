import GuestLayout2 from "@/Layouts/GuestLayout2";
import { Head } from "@inertiajs/react";

export default function TermsOfService() {
    return (
        <>
			<Head title="Terms Of Service" />
			<GuestLayout2>
				<div className="bg-gray-100 min-h-screen">
					<div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
						<div className="max-w-3xl mx-auto">
							<h1 className="text-3xl font-bold text-indigo-600 mb-8">
								Terms of Service
							</h1>
							<section className="mb-12">
								<h2 className="text-xl font-bold text-indigo-600 mb-4">
									Introduction
								</h2>
								<p className="text-gray-700">
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Sed vitae velit sapien. Aliquam
									placerat eros eu magna pellentesque, quis
									posuere ipsum feugiat. Morbi blandit nulla
									augue, sit amet tempus risus efficitur non.
								</p>
							</section>
							<section className="mb-12">
								<h2 className="text-xl font-bold text-indigo-600 mb-4">
									Acceptance of Terms
								</h2>
								<p className="text-gray-700">
									Sed faucibus magna vitae augue pellentesque,
									quis commodo nisl hendrerit. Morbi volutpat odio
									quis elit posuere, sit amet fermentum ipsum
									fermentum. Nullam vel mi non ipsum eleifend
									posuere quis vel dui. Nulla facilisi.
								</p>
							</section>
							<section className="mb-12">
								<h2 className="text-xl font-bold text-indigo-600 mb-4">
									Use of Services
								</h2>
								<p className="text-gray-700">
									Aliquam tincidunt purus sed justo malesuada, nec
									dignissim metus feugiat. Ut a tellus eget quam
									bibendum euismod sit amet at tellus. Aenean in
									ante euismod, tristique lorem ut, maximus odio.
									Sed tincidunt orci eu lorem fringilla, quis
									volutpat ipsum consectetur.
								</p>
							</section>
							<section className="mb-12">
								<h2 className="text-xl font-bold text-indigo-600 mb-4">
									Intellectual Property
								</h2>
								<p className="text-gray-700">
									Integer sed nibh eu mauris consequat aliquam sed
									ac nisi. Ut tempor a quam a interdum. Cras
									ullamcorper, dolor a dictum blandit, libero
									turpis egestas tellus, vel pretium nulla ipsum
									sed enim.
								</p>
							</section>
							<section className="mb-12">
								<h2 className="text-xl font-bold text-indigo-600 mb-4">
									Termination
								</h2>
								<p className="text-gray-700">
									Vestibulum in mollis nulla. Nulla facilisi.
									Phasellus eu nisi id augue facilisis tristique.
									Sed vel est quis nisl mattis dictum. Sed sit
									amet magna finibus, bibendum velit vitae,
									venenatis quam.
								</p>
							</section>
						</div>
					</div>
				</div>
			</GuestLayout2>
        </>
    );
}
