import ProductCard from '../../components/ProductCard';
import { formatEther } from 'viem';
import { List } from 'antd';

export default function MyList({ currentPageData }) {
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
              title: item.title,
              tag: item.tag,
              description: item.description,
              price: formatEther(item.price),
              tokenId: Number(item.id),
              showBuy: true,
            }}
          />
        </List.Item>
      )}
    />
  );
}

