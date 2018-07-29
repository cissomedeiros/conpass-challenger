import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return (
			<header>
				<Link to="/"><img alt="conpass logo" src="/images/conpass.png" /></Link>
			</header>
		)
	}
}

export default Header;