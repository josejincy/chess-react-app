import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import ChessHeader from './components/ChessHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/styles.scss';


const element = (
  <BrowserRouter>
  <Switch>
  <Route path="/" component={ChessHeader} exact={true} />
  </Switch>
  </BrowserRouter>
);

ReactDOM.render(element,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
