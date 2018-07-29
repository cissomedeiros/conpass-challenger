import React, { Component } from 'react';
import Api from './Api';

const initialState = {
	user: { id: Math.floor(Math.random() * 10000000000), name: '', lname: '', compa: '', mail: '', pass: '', rpass: '', date: new Date()}
}

const validateField = { name: true, lname: true, compa: true, mail: true, pass: true, rpass: true, validMail: true, correctPass: true}

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = (props.location.state && {...props.location.state, validateField: validateField}) || { ...initialState, validateField: validateField };
	}

	save() {
		const user = this.state.user
		let users = Api('get', 'conpassUsers');

		if( users.filter(saveUser => { return saveUser.id === user.id }).length > 0 ) {
			users = users.filter(saveUser => { return saveUser.id !== user.id });
		}

		users.push( user );
		Api('update', 'conpassUsers', users);
		this.props.history.push(`/profile/${this.state.user.id}`)
	}

	updateField(event) {
		const user = { ...this.state.user }
		
		user[event.target.name] = event.target.value
		this.setState({ user })
	}

	blurField(event) {
		let validate = this.state.validateField;

		
		if( !event.target.value.trim() ) {
			validate[event.target.name] = false;
		} else {
			validate[event.target.name] = true;
		}

		if( event.target.name === "mail" && !this.validateEmail( event.target.value ) ) {
			validate["validMail"] = false;
		} else {
			validate["validMail"] = true;
		}

		if( event.target.name === "rpass" && this.state.user.pass && this.state.user.pass !== this.state.user.rpass ) {
			validate["correctPass"] = false;
		} else {
			validate["correctPass"] = true;
		}

		this.setState({
			validateField: validate
		})
	}

	validateEmail = (email) => {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	render() {
		return (
			<div className="register">
				<header>
					<div>
						<h1>Register</h1>
						<ul className="show-step">
							<li className="active">1</li>
							<li>2</li>
						</ul>
					</div>
				</header>
				<section>
					<form method="post" id="register" action="save">
						<ul className="lal">
							<li className="columns-50">
								<label htmlFor="cName">First Name</label>
								<input type="text" className="tName"
								onBlur={e => this.blurField(e)}
								name="name"
								value={this.state.user.name}
								onChange={e => this.updateField(e)}
								placeholder=" i.e John " />
								{( !this.state.validateField.name && <p className="input-error">Name can't be blank</p>) || null}
							</li>
							<li className="columns-50">
								<label htmlFor="cLName" className="LName">Lest Name</label>
								<input type="text" className="tLName"
								onBlur={e => this.blurField(e)}
								name="lname"
								value={this.state.user.lname}
								onChange={e => this.updateField(e)}
								placeholder=" i.e Michael " />
								{( !this.state.validateField.lname && <p className="input-error">Last name can't be blank</p>) || null}
							</li>
							<li>
								<label htmlFor="cCompa" className="compa">Company Name</label>
								<input type="text" className="tCompa"
								onBlur={e => this.blurField(e)}
								name="compa"
								value={this.state.user.compa}
								onChange={e => this.updateField(e)}
								placeholder=" i.e Aplle Inc " />
								{( !this.state.validateField.compa && <p className="input-error">Company cna't be blank</p>) || null}
							</li>
							<li>
								<label htmlFor="cMail">Email</label>
								<input type="email" className="tMail"
								onBlur={e => this.blurField(e)}
								name="mail"
								value={this.state.user.mail}
								onChange={e => this.updateField(e)}
								placeholder=" i.e name@company.com" />
								{( !this.state.validateField.mail && <p className="input-error">Email can´t be blank</p>) || null}
								{( !this.state.validateField.validMail && <p className="input-error">Email can´t be valid</p>) || null}
							</li>
							<li className="columns-50">
								<label htmlFor="cPass">Password</label>
								<input type="password" className="tPass"
								onBlur={e => this.blurField(e)}
								name="pass"
								value={this.state.user.pass}
								onChange={e => this.updateField(e)} />
								{( !this.state.validateField.pass && <p className="input-error">Password can't be balnk</p>) || null}
							</li>
							<li className="columns-50">
								<label htmlFor="cRPass" className="RPass">Repeat password</label>
								<input type="password" className="tRPass"
								onBlur={e => this.blurField(e)}
								name="rpass"
								value={this.state.user.rpass}
								onChange={e => this.updateField(e)} />
								{( !this.state.validateField.rpass && <p className="input-error">Repeat the password</p>) || null}
								{( !this.state.validateField.correctPass && <p className="input-error">Passwords are different</p>) || null}
							</li>
						</ul>
					</form>
					<button type="button" className="step" onClick={e => this.save(e)}>NEXT STEP &gt;</button>
				</section>
            		
			</div>
		);
	}
}

export default Register;