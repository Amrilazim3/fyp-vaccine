import { router } from "@inertiajs/react";
import { useEffect } from "react";

const services = [
    {
        name: "google",
        icon: (
            <svg
                className="w-5 h-5 fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
            >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
        ),
    },
    {
        name: "facebook",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: "twitter",
        icon: (
            <svg
                className="w-5 h-5 fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
        ),
    },
];

const openWindow = (url, title, options = {}) => {
    if (typeof url === "object") {
        options = url;
        url = "";
    }
    options = { url, title, width: 600, height: 720, ...options };
    const dualScreenLeft =
        window.screenLeft !== undefined
            ? window.screenLeft
            : window.screen.left;
    const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screen.top;
    const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        window.screen.width;
    const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        window.screen.height;
    options.left = width / 2 - options.width / 2 + dualScreenLeft;
    options.top = height / 2 - options.height / 2 + dualScreenTop;
    const optionsStr = Object.keys(options)
        .reduce((acc, key) => {
            acc.push(`${key}=${options[key]}`);
            return acc;
        }, [])
        .join(",");
    const newWindow = window.open(url, title, optionsStr);
    if (window.focus) {
        newWindow.focus();
    }
    return newWindow;
};

export default function OAuth() {
    useEffect(() => {
        window.addEventListener("message", onMessage, false);

        return () => {
            window.removeEventListener("message", onMessage);
        };
    }, []);


    const hanldeOnClick = (name) => {
        router.get(
            `/oauth/${name}`,
            {},
            {
                onSuccess: (res) => {
                    const newWindow = openWindow("", "login");

                    newWindow.location.href = res.props.url;
                },
            }
        );
    };

    const onMessage = async (e) => {
        if (e.data.id) {
            router.post(
                "/oauth/login",
                { id: e.data.id },
                { preserveScroll: true }
            );
        }
    };

    return (
        <div className="grid grid-cols-3 gap-3">
            {services.map((service) => {
                return (
                    <button
                        key={service.name}
                        type="button"
                        onClick={() => {
                            hanldeOnClick(service.name);
                        }}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="sr-only">
                            sign in with {service.name}
                        </span>
                        {service.icon}
                    </button>
                );
            })}
        </div>
    );
}
