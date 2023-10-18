import { PORT } from "set";

export const getPromise = async ({url, method, body, header}) => {
    return await fetch(`${PORT}/${url}`, { method: method, body: body && body, headers: header && header})
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}