'use client';

import { Provider } from "react-redux";
import { store } from "@/utils/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/utils/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create persistor outside component to avoid recreation on renders
const persistor = persistStore(store);

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}