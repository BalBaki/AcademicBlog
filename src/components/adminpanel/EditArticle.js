import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { AiOutlineLoading3Quarters, AiOutlineCloudUpload } from 'react-icons/ai';
import { useUpdateArticleMutation } from '../../store';
import Modal from '../Modal';
import { useNotification } from '../../hooks/use-notification';

function EditArticle({ article }) {
    const notification = useNotification();
    const { t } = useTranslation();

    const [showEditModal, setShowEditModal] = useState(false);

    const [updateArticle, updateArticleResult] = useUpdateArticleMutation();

    const handleEditClick = () => {
        setShowEditModal(true);
    };

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
        file: Yup.mixed().test('file-type', t('y2mgi'), (value) => {
            return value === undefined || value?.type === 'application/pdf';
        }),
    });

    useEffect(() => {
        if (updateArticleResult.isSuccess) {
            updateArticleResult.data?.updated && setShowEditModal(false);

            notification({
                type: updateArticleResult.data?.error ? 'error' : 'success',
                messages: updateArticleResult.data?.error || t('x33zi'),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateArticleResult.isSuccess]);

    return (
        <>
            <button className="bg-blue-500 rounded-xl w-20 p-1" onClick={handleEditClick}>
                {t('n7xhl')}
            </button>
            {showEditModal && (
                <Modal closeModal={setShowEditModal}>
                    <div className="w-4/5 m-auto">
                        <Formik
                            initialValues={{
                                title: article.title,
                                explanation: article.explanation,
                                file: undefined,
                            }}
                            validationSchema={formSchema}
                            onSubmit={(values, actions) => {
                                const updatedArticle = new FormData();

                                updatedArticle.id = article.id;
                                updatedArticle.append('title', values?.title);
                                updatedArticle.append('explanation', values?.explanation);
                                updatedArticle.append('file', values?.file);

                                updateArticle(updatedArticle);
                            }}
                        >
                            {({ isValid, setFieldValue, values, isSubmitting }) => (
                                <Form>
                                    <div>
                                        <div className="font-bold text-lg">{t('d2gqn') + ':'} </div>
                                        <Field type="text" name="title" className="w-full border-2 px-1" />
                                        <ErrorMessage name="title" component="div" className="text-sm text-red-500" />
                                    </div>
                                    <div className="mt-3">
                                        <div className="font-bold text-lg">{t('k6q7e') + ':'} </div>
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
                                                        {values.file ? values.file?.name : article.fileName}
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <ErrorMessage name="file" component="div" className="text-sm text-red-500" />
                                    </div>
                                    <div className="mt-2 mb-3 flex items-center justify-center">
                                        <button
                                            type="submit"
                                            disabled={
                                                !isValid ||
                                                (values?.title === article.title &&
                                                    values?.explanation === article.explanation &&
                                                    !values?.file) ||
                                                updateArticle.isLoading
                                            }
                                            className="w-28 h-8 bg-green-400 py-1 rounded-3xl font-semibold
                                                margin-auto"
                                        >
                                            {updateArticleResult.isLoading ? (
                                                <AiOutlineLoading3Quarters className="animate-spin w-full" />
                                            ) : (
                                                t('n7xhl')
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

export default EditArticle;
