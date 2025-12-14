import createStore from './store';

export const { store, persistor } = createStore();

export type TReduxState = ReturnType<typeof store.getState>;
export type TReduxDispatch = typeof store.dispatch;
