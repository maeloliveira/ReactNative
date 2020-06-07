import React from 'react';
import ContactsNavigator from './navegacao/ContactsNavigator'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import contatoscRducer from './Store/ContactReducer';
import { init } from './helpers/db';
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

init().then(() => {
  console.log("Sucesso. Base criada!");
}).catch((err) => {
  console.log('Falhou. Erro na criação de base.');
  console.log(err);
});

const rootReducer = combineReducers({
  contatos: contactsReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <ContactsNavigator />
    </Provider>
  );
}
