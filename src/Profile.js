import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from './Api';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: Api('get', 'conpassUsers') && Api('get', 'conpassUsers').filter(user => { return user.id === parseInt( props.match.params.id, 10 ) })[0]
		}
	}

	setUserImage = (event) => {
		const fr = new FileReader();
		const self = this;

		fr.addEventListener("load", function(e) {
			if( e.target.result ) {
				self.setState({
					user: {...self.state.user, image: e.target.result}
				});

				let users = Api('get', 'conpassUsers').filter(user => { return user.id !== parseInt( self.props.match.params.id, 10 ) });
				users.push( self.state.user );
				Api('update', 'conpassUsers', users);
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
