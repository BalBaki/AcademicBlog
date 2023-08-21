import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetchArticlesQuery } from '../store';
import ArticleContainer from '../components/home/ArticleContainer';
// import SideBar from '../components/home/SideBar';
import Loading from '../components/Loading';

function Home() {
    const { t } = useTranslation();
    const { data, isLoading, error } = useFetchArticlesQuery();

    let content;

    if (isLoading) {
        content = <Loading />;
    } else if (error) {
        content = <div>Error at Fetching Articles...</div>;
    } else {
        content =
            data.length < 1 ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
                    <div className="dark:text-white">{t('p247r')}</div>
                    <div className="animate-bounce mt-1">
                        <Link to="/adminpanel" className="text-blue-500 ">
                            {t('r3wbo')}
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex h-120 mt-2">
                    {/* <SideBar list={data} /> */}
                    <ArticleContainer list={data} />
                </div>
            );
    }

    return content;
}

export default Home;
