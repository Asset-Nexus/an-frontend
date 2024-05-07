export interface MintData {
    /**
     * 作者
     */
    author: string;
    /**
     * 合约地址
     */
    contractAddr?: string;
    /**
     * 描述
     */
    desc: string;
    /**
     * IPFS文件url
     */
    fileUrl: string;
    /**
     * 铸造人地址
     */
    fromAddress?: string;
    /**
     * NFT编码, ID 编号
     */
    id?: string;
    /**
     * 价格
     */
    price?: number;
    /**
     * 标签
     */
    tag?: string;
    /**
     * 标题
     */
    title: string;
}