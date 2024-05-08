
export interface ApproveData {
    /**
     * 授权方地址
     */
    from_address: string;
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
    to_address: string;
    [property: string]: any;
}