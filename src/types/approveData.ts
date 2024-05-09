
export interface ApproveData {
    /**
     * 授权方地址
     */
    fromAddress: string;
    /**
     * NFT id值
     */
    id: string;
    /**
     * 签名
     */
    signature?: string;
    /**
     * 被授权方地址
     */
    toAddress: string;
    [property: string]: any;
}