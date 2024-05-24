import ProductCard from '../ProductCard';
import { List } from 'antd';

export default function MyBoughtList({ currentPageData }) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        column: 4,
      }}
      dataSource={[...currentPageData]}
      renderItem={(item) => (
        <List.Item>
          <ProductCard
            product={{
              image: item.fileUrl,
              author: item.author,
              title: item.title,
              description: item.description,
              tag: item.tag,
              tradeTime: item.tradeTime,
              tokenId: Number(item.tokenId),
              showBuy: false,
            }}
          />
        </List.Item>
      )}
    />
  );
}

