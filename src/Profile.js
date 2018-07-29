import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://localhost:3003/users'

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: {}
		}
	}

	componentWillMount() {
		const self = this;

		axios['get'](`${baseUrl}/${this.props.match.params.id}`)
			.then(resp => {
				self.setState({ user: resp.data });
			})
	}

	setUserImage = (event) => {
		const fr = new FileReader();
		const self = this;

		fr.addEventListener("load", function(e) {
			if( e.target.result ) {
				self.setState({
					user: {...self.state.user, image: e.target.result}
				});

				axios['put'](`${baseUrl}/${self.state.user.id}`, self.state.user)
					.then(resp => {
						self.setState({ user: resp.data });
					})
			}
		});

		if( event.target.files && event.target.files[0] ) {
			fr.readAsDataURL( event.target.files[0] );
		}
	}

  render() {
    return (
      <div className="profile">
      	<header>
      		<div>
        		<h1>Profile photo</h1>
				<ul className="show-step">
					<li>1</li>
					<li className="active">2</li>
				</ul>
    		</div>
    	</header>
    		  
        <div className="foto" style={ this.state.user.image && { background: `url(${this.state.user.image}) center / cover` }}>
				<label htmlFor="selecao-foto">{ (!this.state.user.image && 'Click to upload your profile image') || null }</label>
        	<input id="selecao-foto" type="file" onChange={this.setUserImage} accept="image/*" />
        </div>

        <div className="action">
      		<Link to={{ pathname: '/register', state: { user: this.state.user }}} className="voltar"> &lt; Voltar </Link>
      		<Link to="/" className="fini">FINISH &gt; </Link>
      	</div>
      </div>
    );
  }
}

export default Profile;
