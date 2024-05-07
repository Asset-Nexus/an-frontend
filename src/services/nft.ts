import axios from "axios";
import { MintData } from "../types/mintData";
const baseUrl = "http://47.92.54.241:6066";


export const createNft = (data: MintData) => {
    const url = `${baseUrl}/nft/create`
    return axios.post(url, data)
}