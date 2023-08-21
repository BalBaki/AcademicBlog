import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

function Theme({ changeTheme, theme }) {
    const handleChangeThemeClick = () => {
        changeTheme((current) => (current === 'light' ? 'dark' : 'light'));
    };

    return (
        <div
            className="fixed  left-5 bottom-5 flex justify-center items-center 
                cursor-pointer border-2 border-gray-500 rounded-full w-16 h-16 dark:border-white"
            onClick={handleChangeThemeClick}
        >
            {theme === 'light' && <BsFillMoonFill className="w-full text-5xl dark:text-white" />}
            {theme === 'dark' && <BsFillSunFill className="w-full text-5xl dark:text-yellow-400" />}
        </div>
    );
}

export default Theme;
