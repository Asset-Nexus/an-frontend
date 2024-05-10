import ProductCard from '../../components/ProductCard';
import { formatEther } from 'viem';
import { List } from 'antd';

export default function MyList({currentPageData, tokenUris}) {
  
  return (
      <List
          grid={{ gutter: 16, 
            xs: 1,
            sm: 2,
            md: 5,}}
          dataSource={[...currentPageData]}
          renderItem={(item, index) => (
            <List.Item>
              <ProductCard
                product={{
                  image: tokenUris[index],
                  price: formatEther(item.price),
                  tokenId: Number(item.tokenId),
                  showBuy: true,
                }}
              />
            </List.Item>
          )} 
        />
  );
}

