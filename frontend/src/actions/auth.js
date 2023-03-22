import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
const API = "http://localhost:8000/api";

export const signup = (user) => {
    console.log("I am in action", user)
    return fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = (user) => {
    return fetch(`${API}/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const admin = (userId) => {
    return fetch(`${API}/auth/admin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userId)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
    return fetch(`${API}/auth/signout`,{
        method: 'GET'
    })
    .then(response => {
        console.log('Signout Success');
    })
    .catch(err => console.log(err));
}

export const setCookie = (key, value) => {
    if(typeof window !== "undefined") {
        cookie.set(key, value, {
            expires : 1
        })
    }
}

export const removeCookie = key => {
    if(typeof window !== "undefined") {
        cookie.remove(key, {
            expires : 1
        })
    }
}

export const getCookie = (key) => {
    if(typeof window !== "undefined") {
        return cookie.get(key);
    }
}

export const setLocalStorage = (key, value) => {
    if(typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = key => {
    if(typeof window !== "undefined") {
        localStorage.removeItem(key)
    }
}

export const authenticate = (data, next) =>{
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
}

export const isAuth = () => {
    if (typeof window !== "undefined") {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};