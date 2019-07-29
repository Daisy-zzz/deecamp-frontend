import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './index.css';
import App from './App';
import Schedule from './Schedule'
import * as serviceWorker from './serviceWorker';
import MyD3 from './MyD3';

ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={MyD3} />
                {/* <Route path='/' exact component={App} /> */}
                <Route path='/schedule' exact component={Schedule} />
            </Switch>
        </BrowserRouter>
    </LocaleProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
