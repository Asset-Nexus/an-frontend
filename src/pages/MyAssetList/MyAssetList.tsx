import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { abi as marketAbi } from '../../abi/marketplace.abi';
import { abi as nftAbi } from '../../abi/nft.abi';
import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { readContract } from '@wagmi/core'
import { config } from '../../config';


const marketAddress = '0xF393253cDbfbd7c147A35928e874016c873Fb723';
const nftAddress = '0xeC8aCa83fa696c57e58218e0F38698787c217320'


export default function MyAssetList() {
  const account = useAccount();
  const { isLoading, data } = useReadContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'getMyListing',
    args: [account.address],
  });

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
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        'Loading'
      ) : (
        data.map((item, index) => (
          <ProductCard
            key={item.tokenId}
            product={{
              image: tokenUris[index],
              price: Number(formatEther(item.price)),
              // showBuy: false,
            }}
          />
        ))
      )}
    </>
  );
}