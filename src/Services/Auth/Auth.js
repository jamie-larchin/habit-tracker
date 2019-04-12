import auth0 from "auth0-js";

import config from "../../config";
import history from "../../history";

class Auth {
    accessToken;

    idToken;

    expiresAt;

    userProfile;

    tokenRenewalTimeout;

    auth0 = new auth0.WebAuth({
        domain: config.auth.domain,
        clientID: config.auth.clientId,
        audience: config.auth.api,
        redirectUri: config.auth.callbackUrl,
        responseType: "token id_token",
        scope: "openid profile"
    });

    login = () => {
        this.auth0.authorize();
    };

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                history.replace("/dashboard");
                console.error(err);
            }
        });
    };

    getAccessToken = () => {
        return this.accessToken;
    };

    getIdToken = () => {
        return this.idToken;
    };

    setSession = authResult => {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem("isLoggedIn", "true");

        // Set the time that the access token will expire at
        const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        // schedule a token renewal
        this.scheduleRenewal();

        // navigate to the dashboard route
        history.replace("/dashboard");
    };

    renewSession = () => {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.error(err);
            }
        });
    };

    getProfile = cb => {
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    };

    logout = () => {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove user profile
        this.userProfile = null;

        // Clear token renewal
        clearTimeout(this.tokenRenewalTimeout);

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem("isLoggedIn");

        this.auth0.logout({
            return_to: config.auth.allowedLogoutUrl,
            clientID: config.auth.clientId
        });

        // navigate to the public route
        history.replace("/");
    };

    isAuthenticated = () => {
        // Check whether the current time is past the
        // access token"s expiry time
        return new Date().getTime() < this.expiresAt;
    };

    scheduleRenewal = () => {
        const timeout = this.expiresAt - Date.now();
        if (timeout > 0) {
            this.tokenRenewalTimeout = setTimeout(() => {
                this.renewSession();
            }, timeout);
        }
    };

    getExpiryDate = () => {
        return JSON.stringify(new Date(this.expiresAt));
    };
}

export default new Auth();
