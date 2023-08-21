import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { articlesApi } from './apis/articlesApi';
import { notificationSlice } from './slices/notification';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
        notifications: notificationSlice.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(articlesApi.middleware);
    },
});

setupListeners(store.dispatch);

export { store };
export {
    useFetchArticlesQuery,
    useAddArticleMutation,
    useRemoveArticleMutation,
    useUpdateArticleMutation,
} from './apis/articlesApi';

export { addNotification, updateNotifications, deleteNotification } from './slices/notification';
