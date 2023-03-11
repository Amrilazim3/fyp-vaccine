import { Dialog } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import Modal from "./Modal";
import TextInput from "./TextInput";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CustomSelect from "./CustomSelect";
import { Toast } from "@/mixins/toast";

export default function ChildrenForm({ isOpen, handleOnClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        birthdate: "",
        gender: "",
        state: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSelectChange = (name, value) => {
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("children.store"), {
            preserveScroll: true,
            onSuccess: () => {
                handleOnClose();
                reset(["name", "birthdate", "gender", "state"]);
                Toast.fire({
                    icon: "success",
                    title: "Child successfully added",
                });
            },
        });
    };

    return (
        <Modal
            show={isOpen}
            maxWidth="md"
            onClose={handleOnClose}
            closeable={false}
        >
            <form onSubmit={submit}>
                <div className="flex justify-between">
                    <Dialog.Title
                        as="h3"
                        className="text-lg mb-4 font-medium leading-6 text-gray-900"
                    >
                        Add Children
                    </Dialog.Title>
                    <XMarkIcon
                        onClick={handleOnClose}
                        className="w-6 h-6 text-gray-500 hover:text-gray-400 hover:cursor-pointer"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        required
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="birthdate" value="Birthdate" />

                    <TextInput
                        id="birthdate"
                        type="date"
                        name="birthdate"
                        value={data.birthdate}
                        className="mt-1 block w-full"
                        autoComplete="birthdate"
                        required
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.birthdate} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="gender" value="Gender" />

                    <CustomSelect
                        id="gender"
                        className="mt-1 block w-full"
                        options={["male", "female"]}
                        isRequired={true}
                        value={data.gender}
                        onChange={(value) => {
                            handleSelectChange("gender", value);
                        }}
                    />

                    <InputError message={errors.gender} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="state" value="State" />

                    <CustomSelect
                        id="state"
                        className="mt-1 block w-full"
                        value={data.state}
                        options={[
                            "Johor",
                            "Kedah",
                            "Kelantan",
                            "Melaka",
                            "Negeri Sembilan",
                            "Pahang",
                            "Perak",
                            "Perlis",
                            "Pulau Pinang",
                            "Sarawak",
                            "Selangor",
                            "Terengganu",
                            "Kuala Lumpur",
                            "Labuan",
                            "Sabah",
                            "Putrajaya",
                        ]}
                        isRequired={true}
                        onChange={(value) => {
                            handleSelectChange("state", value);
                        }}
                    />

                    <InputError message={errors.state} className="mt-2" />
                </div>

                <div className="flex items-center w-full mt-4">
                    <PrimaryButton
                        type="submit"
                        className="w-full flex justify-center"
                        disabled={processing}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
