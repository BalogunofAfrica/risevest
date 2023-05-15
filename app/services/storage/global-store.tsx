import React, { useState } from "react";
import { MMKV } from "react-native-mmkv";

const storeName = "global-store";
const mmkv = new MMKV({
  id: storeName,
});
const persister = {
  getItem: (name: string) => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => mmkv.delete(name),
  setItem: (name: string, value: string) => mmkv.set(name, value),
};

type StoreObject = {
  firstName: string | undefined;
  lastName: string | undefined;
  pin: number | undefined;
  token: string | undefined;
  username: string | undefined;
};
function useStore<T extends StoreObject>(storeObject: T) {
  const persistedStore = JSON.parse(`${persister.getItem(storeName)}`) as T;
  const [state, setState] = useState(persistedStore || storeObject);

  function getter(): T;
  function getter<K extends keyof T>(selectField: K): T[K];
  function getter<K extends keyof T>(selectField?: K): T[K] | T {
    if (!selectField) return state;

    return state[selectField];
  }

  function setter(updateObject: Partial<T>) {
    setState((state_) => {
      const newState = {
        ...state_,
        ...updateObject,
      };
      persister.setItem(storeName, JSON.stringify(newState));

      return newState;
    });
  }

  return { getter, setter } as const;
}

type Props = {
  children: React.ReactNode;
};
type StoreValues = ReturnType<typeof useStore> | null;
const StoreContext = React.createContext<StoreValues>(null);

export function StoreProvider({ children }: Props) {
  const store = useStore<StoreObject>({
    firstName: undefined,
    lastName: undefined,
    pin: undefined,
    token: undefined,
    username: undefined,
  });

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
export function useGlobalStore() {
  const contextValue = React.useContext(StoreContext);

  if (!contextValue) {
    throw new Error("Wrap your components tree with a StoreProvider component");
  }

  return contextValue;
}
useGlobalStore.getStore = () =>
  JSON.parse(`${persister.getItem(storeName)}`) as StoreObject;
