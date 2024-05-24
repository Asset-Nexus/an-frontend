import axios from "axios";
import { IssueData } from "../types/issueData";

const session = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ENDPOINT
})

export const issueNft = (data: IssueData) => {
    const url = `/nft/issue`
    return session.post(url, data)
}

export const getBoughtNfts = (buyerAddress: string) => {
    const url = `/nft/bought/list/${buyerAddress}`
    return session.get(url)
}
export const listNfts = () => {
    const url = `/nft/list`
    return session.get(url)
}