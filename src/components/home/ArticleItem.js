import { Link } from 'react-router-dom';

export default function ArticleItem({ article }) {
    return (
        <div className=" 2xl:w-1/5 xl:w-1/4 lg:w-1/3 md:w-1/2 w-full p-2">
            <Link to={'/file?name=' + article.fileName} className="w-full flex justify-center items-center">
                <div
                    className="h-48 w-full max-w-xs bg-cyan-600 text-center break-words px-2 rounded-xl 
            cursor-pointer"
                >
                    <div className="text-xl border-b-2 h-16 line-clamp-2" title={article.title}>
                        {article.title}
                    </div>
                    <div className="text-base line-clamp-5 mt-1" title={article.explanation}>
                        {article.explanation}
                    </div>
                </div>
            </Link>
        </div>
    );
}
