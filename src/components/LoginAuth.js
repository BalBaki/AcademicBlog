import { Navigate } from 'react-router-dom';
import { useVerify } from '../hooks/use-token-verify';
import Loading from './Loading';

function LoginAuth({ children, to }) {
    const [isLogged, loading, error] = useVerify();

    let content;

    if (loading) {
        content = <Loading />;
    } else if (error) {
        content = <div>{error}</div>;
    } else {
        content = isLogged ? children : <Navigate to={to || '/login'} replace />;
    }

    return content;
}

export default LoginAuth;
