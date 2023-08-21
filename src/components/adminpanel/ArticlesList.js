import { useTranslation } from 'react-i18next';
import { useFetchArticlesQuery } from '../../store/apis/articlesApi';
import EditArticle from './EditArticle';
import DeleteArticale from './DeleteArticle';
import Loading from '../Loading';

function ArticlesList() {
    const { t } = useTranslation();
    const { data, isLoading, error } = useFetchArticlesQuery();

    let content;

    if (isLoading) {
        content = (
            <tr>
                <td>
                    <Loading />
                </td>
            </tr>
        );
    } else if (error) {
        content = (
            <tr>
                <td>Error at Fetching Articles...</td>
            </tr>
        );
    } else {
        content = data?.map((article) => {
            return (
                <tr key={article.id} className="h-12 text-center">
                    <td className="border-2 w-3/12">{article.title}</td>
                    <td className="w-6/12 border-2">{article.explanation}</td>
                    <td className="border-2 w-2/12">{article.fileName.replace('.pdf', '')}</td>
                    <td className="w-1/12">
                        <div className=" lg:flex lg:items-center lg:justify-center ml-1">
                            <EditArticle article={article} />
                            <DeleteArticale article={article} />
                        </div>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <div className="flex justify-center items-center mt-2 dark:text-white">
                <table className="table-auto break-all w-full mx-5 lg:w-3/4 lg:mx-0 ">
                    <thead className="bg-cyan-900 text-white h-12">
                        <tr className="text-center">
                            <td>{t('d2gqn')}</td>
                            <td>{t('k6q7e')}</td>
                            <td>{t('o1ogx')}</td>
                        </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </table>
            </div>
        </>
    );
}

export default ArticlesList;
