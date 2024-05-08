import axios from "axios";
import { MintData } from "../types/mintData";

const session = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ENDPOINT
})

export const createNft = (data: MintData) => {
    const url = `/nft/create`
    return session.post(url, data)
}

export const approveNft = (data) => {
    const url = `/nft/authorize`
    return session.post(url, data)
}
