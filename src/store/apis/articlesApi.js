import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const articlesApi = createApi({
    reducerPath: 'articles',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fetchArticles: builder.query({
                providesTags: (result, error) => {
                    let tags = [];

                    if (result) {
                        tags = result.map((article) => {
                            return { type: 'Article', id: article.id };
                        });

                        tags.push({ type: 'Articles' });
                    }

                    return tags;
                },
                query: () => {
                    return {
                        method: 'GET',
                        url: '/articles',
                    };
                },
            }),
            addArticle: builder.mutation({
                invalidatesTags: (result, error, article) => {
                    return result?.created ? [{ type: 'Articles' }] : undefined;
                },
                query: (article) => {
                    return {
                        method: 'POST',
                        url: '/article',
                        body: article,
                    };
                },
            }),
            removeArticle: builder.mutation({
                invalidatesTags: (result, error, article) => {
                    return result?.deleted ? [{ type: 'Article', id: article.id }] : undefined;
                },
                query: (article) => {
                    return {
                        method: 'DELETE',
                        url: `/deleteArcticle/${article.id}`,
                    };
                },
            }),
            updateArticle: builder.mutation({
                invalidatesTags: (result, error, article) => {
                    return result?.updated ? [{ type: 'Article', id: article.id }] : undefined;
                },
                query: (article) => {
                    return {
                        method: 'PUT',
                        url: `/changeArticle/${article.id}`,
                        body: article,
                    };
                },
            }),
        };
    },
});

export { articlesApi };
export const { useFetchArticlesQuery, useAddArticleMutation, useRemoveArticleMutation, useUpdateArticleMutation } =
    articlesApi;
