import { useState, useEffect } from 'react';

function useLocalStorageToken() {
	const initialToken = localStorage.getItem('mate-user-token') || null;
	const [token, setToken] = useState(initialToken);

	useEffect(
		function setTokenLocalStorage() {
			if (token === null) {
				localStorage.removeItem('mate-user-token');
			} else {
				localStorage.setItem('mate-user-token', token);
			}
		},
		[token]
	);

	return [token, setToken];
}

export default useLocalStorageToken;
