import auth0 from "auth0-js";
import { History as history } from "../../Services";

class Auth {
    accessToken;
    idToken;
    expiresAt;

    auth0 = new auth0.WebAuth({
        domain: "jamielarchin.au.auth0.com",
        clientID: "PRIPImNvSyNXsc64YFfi3WYpUOIKzQl9",
        redirectUri: "http://localhost:3001/callback",
        responseType: "token id_token",
        scope: "openid"
    });

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                history.replace('/');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken = () => {
        return this.accessToken;
    }

    getIdToken = () => {
        return this.idToken;
    }

    setSession = authResult => {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        // navigate to the home route
        history.replace('/');
    }

    renewSession = () => {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    login = () => {
        this.auth0.authorize();
    }

    logout = () => {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');

        // navigate to the home route
        history.replace('/');
    }

    isAuthenticated = () => {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }
}

export default Auth;