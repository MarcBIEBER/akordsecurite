import axios from 'axios';

function getCookie(cookie_name) {
	// Get the cookie value from the cookie name
	const cookies = document.cookie.split(';');
	let accessToken = null;
	cookies.forEach(cookie => {
		const parts = cookie.trim().split('=');
		const name = parts[0];
		const value = parts[1];
		if (name === cookie_name) {
			accessToken = value;
		}
	});
	return accessToken;
}

function checkLoginStatus() {
	const data = {
		authorization: getCookie("accessTokens")
	};
	axios.post("http://localhost:8080/user/api/v1/isLogedIn", data)
		.then(response => {
			console.log("user is loged in")
		})
		.catch(error => {
			console.log(error)
			window.location.href = "/login";
		});
}

export default checkLoginStatus;