import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { abi as marketAbi } from '../../abi/marketplace.abi';
import { abi as nftAbi } from '../../abi/nft.abi';
import { useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { readContract } from '@wagmi/core'
import { config } from '../../config';
import { List, Pagination } from 'antd';

const nftAddress = process.env.REACT_APP_NFT_ADDRESS as `0x${string}`
const marketAddress = process.env.REACT_APP_MARKET_ADDRESS as `0x${string}`
const pageSize = 20;

export default function AssetList() {
  const {  data } = useReadContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'getAllListing',
  });

  const [page, setPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  const [tokenUris, setTokenUris] = useState([]);

  useEffect(() => {
    const fetchTokenUris = async () => {
      const uris = await Promise.all(
        data.map(async (item) => {
          const uri = await readContract(config, {
            abi: nftAbi,
            address: nftAddress,
            functionName: 'tokenURI',
            args: [item.tokenId],
          });
          return uri;
        })
      );
      setTokenUris(uris);
    };

    if (data && data.length > 0) {
      fetchTokenUris();
      setCurrentPageData(data.slice((page-1)* pageSize, page* pageSize))
    }
  }, [data, page]);

  const onPagination = async (e) => {
    setPage(e)
  }

  

  return (
    <>
      <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={[...currentPageData]}
          renderItem={(item, index) => (
            <List.Item>
              <ProductCard
                product={{
                  image: tokenUris[index],
                  price: Number(formatEther(item.price)),
                  tokenId: Number(item.tokenId),
                  showBuy: true,
                }}
              />
            </List.Item>
          )} 
        />
        <Pagination onChange={onPagination} total={data?.length || 0} pageSize={pageSize} current={page} />
        </>
  );
}

