import React, { Component } from 'react';
import logo from './resources/images/logo.svg';
import './App.css';
import Chatfooter from './containers/chat-footer/chat-footer';


class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Chat</h1>
				</header>
				<Chatfooter/>
			</div>
		);
	}
}

export default App;



