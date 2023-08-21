import { useTranslation } from 'react-i18next';

function NoPage() {
    const { t } = useTranslation();

    return (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-min text-center dark:text-white">
            <div className="text-[150px] sm:text-[250px] leading-none">404</div>
            <div className="text-2xl sm:text-3xl leading-none">{t('h7hlw')}</div>
        </div>
    );
}

export default NoPage;
