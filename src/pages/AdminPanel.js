import { IoIosLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddArticle from '../components/adminpanel/AddArticle';
import ArticlesList from '../components/adminpanel/ArticlesList';
import { useNotification } from '../hooks/use-notification';

function AdminPanel() {
    const navigate = useNavigate();
    const notification = useNotification();
    const { t } = useTranslation();

    const handleLogoutClick = () => {
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        notification({
            type: 'success',
            messages: t('b8nap'),
        });

        navigate('/');
    };
    return (
        <div>
            <header>
                <div className="bg-cyan-700 flex justify-between items-center h-12 py-2">
                    <Link to="/" className="ml-2 text-3xl max-[340px]:text-2xl">
                        Admin Panel
                    </Link>
                    <div
                        className="bg-white rounded-2xl px-2 py-1 mr-2 w-24 flex justify-center items-center
                            cursor-pointer"
                        onClick={handleLogoutClick}
                    >
                        <IoIosLogOut className="text-xl" />
                        <div className="ml-1">{t('h84rl')}</div>
                    </div>
                </div>
            </header>
            <AddArticle />
            <ArticlesList />
        </div>
    );
}

export default AdminPanel;
