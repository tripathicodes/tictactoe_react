import React from 'react';
import logo from './logo.svg';
import './App.css';
import store from './store'
import {Provider} from 'react-redux';
import Board from './components/Board'

//@ts-ignore
const getBoard = () => (<Board/>)

const App: React.FC = () => {
  return (
    <Provider store={store}>
    {getBoard()}
    </Provider>
  );
}


export default App;
