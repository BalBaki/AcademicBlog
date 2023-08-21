import { useTranslation } from 'react-i18next';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Loading() {
    const { t } = useTranslation();

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 dark:text-white">
            <div className="relative">
                <AiOutlineLoading3Quarters className="animate-spin h-full w-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <div className="animate-heartBeat text-sm">{t('t3gt7')}</div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
