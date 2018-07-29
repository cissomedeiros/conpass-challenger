import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from './Api';

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class Users extends Component {
  constructor() {
		super();
		this.state = {
			users: Api('get', 'conpassUsers')
		}
	}
  
  render() {
    return (
      <div className="users">
        <header>
          <div>
            <h1>Users</h1>
          </div>
          <div>
            <Link to="/register" className="btn">Add new user</Link>
          </div>
        </header>
        <section>
          <ul>
            <li>
              <div className="collum-1 collum-fixed">Full Name</div>
              <div className="collum-2 collum-fixed">Created at</div>
            </li>
            { 
              ( ( this.state.users.length && this.state.users.map((user, index) => {
                const userDate = new Date(user.date);
                const initsName = `${user.name.substr(0, 1)} ${user.lname.substr(0, 1)}`;
                return (
                  <li key={index}>
                    <Link to={`/profile/${user.id}`}>
                      <div className="avatar" style={ user.image && { background: `url(${user.image}) center / cover` }}>{ ( !user.image && initsName ) || null }</div>
                    </Link>
                    <Link to={{ pathname: '/register', state: { user: user }}} className="collum-1">{user.name} {user.lname}</Link>
                    <div className="collum-2">{`${userDate.getDate()} ${month[userDate.getMonth()]}, ${userDate.getFullYear()}, ${userDate.getHours()}:${userDate.getMinutes()}`}</div>
                  </li>
                )
              }) ) || <li className="not-user">Do not have users</li> )
            }
          </ul>
        </section>
      </div>
    );
  }
}

export default Users;
