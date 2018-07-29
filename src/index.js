import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './Index.css';
import Users from './Users';
import Header from './Header';
import Profile from './Profile';
import Register from './Register';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<main>
			<Header />
			<div className="app">
				<Switch>
					<Route path="/" exact={true} component={Users} />
					<Route path="/register" component={Register} />
					<Route path="/profile/:id" component={Profile} />
				</Switch>
			</div>
		</main>
	</BrowserRouter>, 
document.getElementById('root'));
registerServiceWorker();
