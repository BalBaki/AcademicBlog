import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSpinner } from 'react-icons/fa';
import { useRemoveArticleMutation } from '../../store';
import { useNotification } from '../../hooks/use-notification';
import { useConfirm } from '../../hooks/use-confirm';

function DeleteArticale({ article }) {
    const notification = useNotification();
    const { t } = useTranslation();
    const [showConfirm, Confirm] = useConfirm();

    const [removeArticle, removeArticleResult] = useRemoveArticleMutation();

    useEffect(() => {
        if (removeArticleResult.isSuccess) {
            notification({
                type: removeArticleResult.data?.deleted ? 'success' : 'error',
                messages: removeArticleResult.data?.error || t('j7kd9'),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removeArticleResult.isSuccess]);

    const handleDeleteClick = () => {
        showConfirm(true);
    };

    return (
        <>
            <button
                className="bg-red-500 rounded-xl w-20 p-1 max-lg:mt-1 lg:ml-2"
                disabled={removeArticleResult.isLoading}
                onClick={handleDeleteClick}
            >
                {removeArticleResult.isLoading ? <FaSpinner className="w-full" /> : t('w86y1')}
            </button>
            <Confirm action={() => removeArticle(article)} accept={t('o4d2s')} cancel={t('o6szp')}>
                {t('z6y1k')}
            </Confirm>
        </>
    );
}

export default DeleteArticale;
