import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/uiSlice';
import portfolioSlice from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    portfolio: portfolioSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;