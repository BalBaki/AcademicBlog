import { useEffect, useState } from 'react';
import axios from 'axios';

const useVerify = () => {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const token = document.cookie.match(`(^|;)\\s*token\\s*=\\s*([^;]+)`)?.pop() || '';

    useEffect(() => {
        token &&
            axios
                .post('http://localhost:3005/verify', { token })
                .then((res) => {
                    setLoading(false);
                    setResponse(res.data);
                })
                .catch((err) => setError(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [response?.valid, token ? loading : false, error];
};

export { useVerify };
