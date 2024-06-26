import { useEffect, useState } from 'react';
import { Pagination, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import MyList from '../../components/MyList/MyList';
import styled from '@emotion/styled';
import { listNfts } from '../../services/market';


const pageSize = 20;

const Title = styled(Typography.Title)`
font-family: MuseoModerno;
font-size: 32px;
font-weight: 700;
line-height: 40px;
letter-spacing: -0.40799999237060547px;
text-align: center;
`

export function AssetList() {

  const [page, setPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await listNfts();
      const result = response.data.data
      setData(result)
    }
    fetchList()

  }, []);

  useEffect(() => {
    setCurrentPageData(data.slice((page - 1) * pageSize, page * pageSize))
  }, [data, page]);

  const onPagination = async (e) => {
    setPage(e)
  }

  return (
    <Space direction='vertical' style={{ display: 'flex' }}>
      <MyList currentPageData={currentPageData}></MyList>
      {!!data?.length && <Pagination onChange={onPagination} total={data?.length || 0} pageSize={pageSize} current={page} />}
    </Space>
  );
}

export default function AssetListPage() {
  return (
    <Content style={{ padding: 48 }}>
      <Title>All Nft in Marketplace</Title>
      <AssetList />
    </Content>
  );
}
