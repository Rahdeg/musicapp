import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {StateProvider} from './Context/stateProvider'
import './index.css';
import App from './App';
import { initialState } from './Context/initialState';
import reducer from './Context/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<React.StrictMode>
<StateProvider initialState={initialState} reducer={reducer} >
<App /> 
</StateProvider>
</React.StrictMode>
</BrowserRouter>
 
);


