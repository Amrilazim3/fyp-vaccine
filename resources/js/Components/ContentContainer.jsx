export default function Content({ children }) {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
