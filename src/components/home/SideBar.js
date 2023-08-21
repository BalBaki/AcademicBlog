function SideBar({ list }) {
    const renderedList = list.map((article) => {
        return (
            <div key={article.id} className="h-12">
                <div
                    className="bg-red-500 border-2 border-gray-400 w-full h-full flex justify-center items-center
                        rounded-2xl cursor-pointer"
                >
                    {article.title}
                </div>
            </div>
        );
    });

    return <div className="sidebar overflow-y-auto w-56 mt-2 hidden sm:block">{renderedList}</div>;
}

export default SideBar;
