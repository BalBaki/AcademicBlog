import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillLock } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNotification } from '../hooks/use-notification';
import { useVerify } from '../hooks/use-token-verify';
import Loading from '../components/Loading';

function Login() {
    const notification = useNotification();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLogged, loading, error] = useVerify();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowIconClick = () => {
        setShowPassword((current) => !current);
    };

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required(() => t('g8fgb'))
            .email(() => t('p00ab'))
            .min(8, ({ min }) => `${t('r2hng') + min}`),
        password: Yup.string()
            .required(() => t('y0kxk'))
            .min(8, ({ min }) => `${t('r2hng') + min}`),
    });

    const ReValidation = ({ validateForm }) => {
        useEffect(() => {
            const onLanguageChange = (lng) => {
                validateForm();
            };

            i18next.on('languageChanged', onLanguageChange);

            return () => i18next.off('languageChanged', onLanguageChange);
        }, [validateForm]);
    };

    let content;

    if (loading) {
        content = <Loading />;
    } else if (error) {
        content = <div>Error</div>;
    } else {
        content = isLogged ? (
            <Navigate to="/" />
        ) : (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={async (values, actions) => {
                        const response = await axios.post('http://localhost:3005/login', values);

                        notification({
                            type: response.data.login ? 'success' : 'error',
                            messages: t(response.data.login ? 'b0jlu' : 'q90mr'),
                        });

                        if (response.data.login) {
                            document.cookie = 'token=' + response.data.token;

                            navigate('/adminpanel');
                        }
                    }}
                >
                    {({ isValid, dirty, isSubmitting, validateForm }) => (
                        <Form>
                            <div className="w-80 sm:w-96 max-[340px]:w-64 h-56 border-2 rounded-2xl relative">
                                <div>
                                    <BsFillPersonFill
                                        className="text-8xl bg-cyan-700 text-white absolute left-1/2
                                        -translate-y-1/2 -translate-x-1/2 rounded-full p-3"
                                    />
                                </div>
                                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                                    <div className="h-16">
                                        <div className="flex justify-center">
                                            <BsFillPersonFill className="text-2xl bg-cyan-700 text-white p-2 w-10 h-9" />
                                            <Field
                                                type="text"
                                                name="email"
                                                className="border-2 w-4/5 px-1 "
                                                placeholder="Email"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-sm text-center text-red-500"
                                        />
                                    </div>
                                    <div className="h-16">
                                        <div className="flex justify-center relative">
                                            <AiFillLock className="text-2xl bg-cyan-700 text-white p-2 w-10 h-9" />
                                            <Field
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                className="border-2 w-4/5 pl-1 pr-7"
                                                placeholder="Password"
                                            />
                                            <div
                                                className="absolute flex items-center justify-center h-full
                                                right-4 sm:right-6 max-[340px]:right-2.5"
                                                onClick={handleShowIconClick}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-sm text-center text-red-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/5 m-auto text-center  border-x-2 border-b-2 rounded-2xl">
                                <button
                                    type="submit"
                                    disabled={!(isValid && dirty) || isSubmitting}
                                    className="w-full h-full my-1 dark:text-white"
                                >
                                    {t('i9bkl')}
                                </button>
                            </div>
                            <ReValidation validateForm={validateForm} />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

    return content;
}

export default Login;
