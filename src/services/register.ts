import axios from "axios";

const session = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ENDPOINT
})

export const apiRegister = (data) => {
    const url = `/user/register`
    return session.post(url, data)
}
