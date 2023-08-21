import { useState, useRef } from 'react';
import ArticleItem from './ArticleItem';

export default function ArticleContainer({ list }) {
    const [pageNum, setPageNum] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const divEl = useRef();
    list = list.filter((article) => article.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) || [];

    const itemCountPerPage = 11;
    const pageNavigationLimit = 9;
    const pageCount = Math.ceil((list || []).length / itemCountPerPage);

    const handlePageNumberClick = (num) => {
        if (num !== pageNum) {
            setPageNum(num);
        }
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value.toLocaleLowerCase());
    };

    const content = list.slice((pageNum - 1) * itemCountPerPage, pageNum * itemCountPerPage).map((article, index) => {
        return <ArticleItem key={article.id} article={article} />;
    });

    const renderedPageNumbers = Array.from(
        Array(pageNavigationLimit < pageCount ? pageNavigationLimit : pageCount).keys()
    ).map((num, index) => {
        const page =
            index +
            1 +
            (pageNum > Math.ceil(pageNavigationLimit / 2) && pageNavigationLimit < pageCount
                ? pageNum + Math.ceil(pageNavigationLimit / 2) > pageCount
                    ? pageCount - pageNavigationLimit
                    : pageNum - Math.ceil(pageNavigationLimit / 2)
                : 0);

        return (
            <li
                key={num}
                className={
                    'border-solid border-2 w-8 text-center rounded-3xl ' +
                    (page === pageNum ? 'bg-red-500' : 'bg-blue-500')
                }
            >
                <button
                    className="w-full h-full"
                    onClick={() => handlePageNumberClick(page)}
                    disabled={page === pageNum}
                >
                    {page}
                </button>
            </li>
        );
    });

    return (
        <div className="w-full">
            <div>
                <div className="px-2 h-12 flex items-center justify-center">
                    <input
                        type="text"
                        className="w-full border-2 px-1"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                </div>
            </div>
            <div ref={divEl} className="flex flex-wrap">
                {content}
            </div>
            {pageCount > 1 && (
                <div className="flex justify-center items-center mt-3">
                    <ul className="flex">{renderedPageNumbers}</ul>
                </div>
            )}
        </div>
    );
}
