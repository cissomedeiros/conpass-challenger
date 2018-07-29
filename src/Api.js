const methods = {
	get: (key) => {
		return ( window.localStorage.getItem(key) && JSON.parse( window.localStorage.getItem(key) ) ) || []
	},
	update: (key, value) => {
		if( key && value ) {
			return window.localStorage.setItem(key, JSON.stringify( value ))
		} else {
			return {error: true}
		}
	}
}

const Api = (method, key, value) => {
	if( method && key ) {
		return methods[method](key, value);
	}
}

export default Api;