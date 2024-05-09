import axios from "axios";
import { IssueData } from "../types/issueData";

const session = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ENDPOINT
})

export const issueNft = (data: IssueData) => {
    const url = `/nft/issue`
    return session.post(url, data)
}