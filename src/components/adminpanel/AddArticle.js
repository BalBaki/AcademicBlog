import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { AiOutlineLoading3Quarters, AiOutlineCloudUpload } from 'react-icons/ai';
import Modal from '../Modal';
import { useAddArticleMutation } from '../../store';
import { useNotification } from '../../hooks/use-notification';

function AddArticle() {
    const notification = useNotification();
    const { t } = useTranslation();

    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddArticleClick = () => {
        setShowAddModal(true);
    };
    const [addArticle, addArticleResult] = useAddArticleMutation();

    useEffect(() => {
        if (addArticleResult.isSuccess) {
            addArticleResult.data?.created && setShowAddModal(false);

            notification({
                type: addArticleResult.data?.error ? 'error' : 'success',
                messages: addArticleResult.data?.error || t('w9vbe'),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addArticleResult.isSuccess]);

    const formSchema = Yup.object().shape({
        title: Yup.string()
            .required(t('n3eqy'))
            .max(50, ({ value, max }) => {
                return `${t('i2gyg') + max}. ${t('h1nmn') + value.length}`;
            }),
        explanation: Yup.string()
            .required(t('l92jc'))
            .max(255, ({ value, max }) => {
                return `${t('i2gyg') + max}. ${t('h1nmn') + value.length}`;
            }),
        file: Yup.mixed()
            .required(t('p2txx'))
            .test('file-type', t('y2mgi'), (value) => value?.type === 'application/pdf'),
    });

    return (
        <>
            <button
                className="w-28 bg-green-400 py-1 rounded-3xl font-semibold mt-2 ml-2 dark:text-white"
                onClick={handleAddArticleClick}
            >
                {t('z980b')}
            </button>
            {showAddModal && (
                <Modal closeModal={setShowAddModal}>
                    <div className="w-4/5 m-auto">
                        <Formik
                            initialValues={{
                                title: '',
                                explanation: '',
                                file: undefined,
                            }}
                            validationSchema={formSchema}
                            onSubmit={(values, actions) => {
                                const article = new FormData();

                                article.append('title', values?.title);
                                article.append('explanation', values?.explanation);
                                article.append('file', values?.file);

                                addArticle(article);
                            }}
                        >
                            {({ isValid, setFieldValue, dirty, values }) => (
                                <Form>
                                    <div>
                                        <div className="font-bold text-lg">{t('d2gqn') + ':'}</div>
                                        <Field type="text" name="title" className="w-full border-2 px-1" />
                                        <ErrorMessage name="title" component="div" className="text-sm text-red-500" />
                                    </div>
                                    <div className="mt-3">
                                        <div className="font-bold text-lg">{t('k6q7e') + ':'}</div>
                                        <Field
                                            type="text"
                                            name="explanation"
                                            as="textarea"
                                            className="w-full h-40 resize-none border-2 px-1"
                                        />
                                        <ErrorMessage
                                            name="explanation"
                                            component="div"
                                            className="text-sm text-red-500"
                                        />
                                    </div>
                                    <div className="mt-2 relative">
                                        <div className="font-bold text-lg">{t('o1ogx') + ':'}</div>
                                        <Field
                                            type="file"
                                            id="file"
                                            name="file"
                                            value={undefined}
                                            className="top-1/2 left-1/2 opacity-0 w-0 h-0 absolute"
                                            onChange={(event) => {
                                                setFieldValue('file', event.target.files[0]);
                                            }}
                                        />
                                        <label htmlFor="file" className="cursor-pointer ">
                                            <div
                                                className="flex justify-center items-center h-48 border-dashed 
                                                    border-2 rounded-2xl"
                                            >
                                                <div>
                                                    <AiOutlineCloudUpload className="text-7xl opacity-50 w-full" />
                                                    <div className="text-center">
                                                        {values.file ? values.file?.name : t('k9vej')}
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <ErrorMessage name="file" component="div" className="text-sm text-red-500" />
                                    </div>
                                    <div className="mt-2 mb-3 flex items-center justify-center">
                                        <button
                                            type="submit"
                                            disabled={!(isValid && dirty) || addArticleResult.isLoading}
                                            className="w-28 h-8 bg-green-400 py-1 rounded-3xl font-semibold
                                                margin-auto"
                                        >
                                            {addArticleResult.isLoading ? (
                                                <AiOutlineLoading3Quarters className="animate-spin w-full" />
                                            ) : (
                                                t('f3voh')
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default AddArticle;
