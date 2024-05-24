import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Pagination, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styled from '@emotion/styled';
import { getBoughtNfts } from '../../services/market';
import MyBoughtList from '../../components/MyBoughtList';


const Title = styled(Typography.Title)`
  font-family: MuseoModerno;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -0.40799999237060547px;
  text-align: center;
`

const pageSize = 20;

export default function MyAssetList() {
  const { address } = useAccount();


  const [page, setPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchList = async (address: string) => {
      const response = await getBoughtNfts(address);
      const result = response.data.data
      setData(result)
    }
    if (address) fetchList(address)
    

  }, [address]);

  useEffect(() => {
    setCurrentPageData(data.slice((page - 1) * pageSize, page * pageSize))
  }, [data, page]
  )

  const onPagination = async (e) => {
    setPage(e)
  }

  return (
    <>
      <Title>My Nft List In MarketPlace</Title>
      <Content style={{ padding: 48 }}>
        <Space direction='vertical' style={{ display: 'flex' }}>
          <MyBoughtList currentPageData={currentPageData} ></MyBoughtList>
          {!!data?.length && <Pagination onChange={onPagination} total={data?.length || 0} pageSize={pageSize} current={page} />}
        </Space>
      </Content>
    </>
  );
}

