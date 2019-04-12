import axios from "axios";
import config from "../../config";

import { Auth } from "..";

class Api {
    BASE_URL = `${config.api}api/`;

    habits = {
        getAll: () => this.getAll("habits"),
        get: id => this.get("habits", id),
        post: data => this.post("habits", data),
        put: (id, data) => this.put("habits", id, data),
        delete: id => this.delete("habits", id)
    };

    sendRequest = (uri, method, data) => {
        const token = Auth.accessToken;
        let requestConfig = {
            method,
            url: `${this.BASE_URL}${uri}`,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        if (method === "post" || method === "put") {
            requestConfig = { ...requestConfig, data };
        }

        return axios(requestConfig);
    };

    getAll = uri => {
        return this.sendRequest(uri, "get");
    };

    get = (uri, id) => {
        return this.sendRequest(`${uri}/${id}`, "get");
    };

    post = (uri, data) => {
        return this.sendRequest(uri, "post", data);
    };

    put = (uri, id, data) => {
        return this.sendRequest(`${uri}/${id}`, "put", data);
    };

    delete = (uri, id) => {
        return this.sendRequest(`${uri}/${id}`, "delete");
    };
}

export default new Api();
