import React, { Component } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css'

class App extends Component {
	constructor(){
		super()
		this.state = { 
			robots : [],
			searchfield : '' 
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then((response)=> response.json())
		.then((users)=>this.setState({robots: users}))
	}

	onSearchChange=(event)=>{
		this.setState({searchfield : event.target.value})
	}

	render(){
		const { robots, searchfield } = this.state;
		const filteredrobots = robots.filter(robot => { 
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		if(!robots.length)
			return <h2 className='tc'>Loading...</h2>
		else{
			return(
				<div className = 'tc'>
					<h1>RoboFriends</h1>
					<div className = 'pa2'>
						<input className = 'pa3 ba b--green bg-lightest-blue shadow-5' 
						type = 'search' 
						placeholder = 'search robots' 
						onChange = {this.onSearchChange}
						/>
					</div>
					<Scroll>
						<CardList robots = {filteredrobots}/>
					</Scroll>
			    </div>
			);
		}
	}
}

export default App;