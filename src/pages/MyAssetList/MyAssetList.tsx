import { useEffect, useState } from 'react';
import { abi as marketAbi } from '../../abi/marketplace.abi';
import { abi as nftAbi } from '../../abi/nft.abi';
import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core'
import { config } from '../../config';
import { Pagination, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styled from '@emotion/styled';
import MyList from '../../components/MyList/MyList';


const Title = styled(Typography.Title)`
font-family: MuseoModerno;
font-size: 32px;
font-weight: 700;
line-height: 40px;
letter-spacing: -0.40799999237060547px;
text-align: center;
`

const nftAddress = process.env.REACT_APP_NFT_ADDRESS as `0x${string}`
const marketAddress = process.env.REACT_APP_MARKET_ADDRESS as `0x${string}`
const pageSize = 20;

export default function MyAssetList() {
  const account = useAccount();
  const { data } = useReadContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'getMyListing',
    args: [account.address],
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
      setCurrentPageData(data.slice((page - 1) * pageSize, page * pageSize))
    }
  }, [data, page]);

  const onPagination = async (e) => {
    setPage(e)
  }

  return (
    <>
      <Title>My Nft List In MarketPlace</Title>
      <Content style={{ padding: 48 }}>
        <MyList currentPageData={currentPageData} tokenUris={tokenUris}></MyList>
        {!!data?.length && <Pagination onChange={onPagination} total={data?.length || 0} pageSize={pageSize} current={page} />}
      </Content>
    </>
  );
}

