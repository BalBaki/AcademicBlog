import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import NoPage from './pages/NoPage';
import LoginAuth from './components/LoginAuth';
import Notification from './components/Notification';
import Pdf from './pages/Pdf';
import Theme from './components/Theme';
import Language from './components/Language';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    localStorage.setItem('theme', theme);

    useEffect(() => {
        theme === 'dark' && document.documentElement.classList.add('dark');

        return () => document.documentElement.classList.remove('dark');
    }, [theme]);

    return (
        <div className="dark:bg-gray-800">
            <Language />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="file" element={<Pdf />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="adminpanel"
                    element={
                        <LoginAuth>
                            <AdminPanel />
                        </LoginAuth>
                    }
                />
                <Route path="*" element={<NoPage />} />
            </Routes>
            <Theme changeTheme={setTheme} theme={theme} />
            <Notification />
        </div>
    );
}

export default App;
