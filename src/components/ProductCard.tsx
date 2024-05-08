import React from 'react';
import { PayButton } from './PayButton';
import { Card } from 'antd';

const { Meta } = Card;

interface MyComponentProps {
    product: {
      image: string;
      price: number;
      tokenId: number;
      showBuy?: boolean;
    };
  }

const ProductCard: React.FC<MyComponentProps> = ({ product: { image, price, tokenId, showBuy = false } }) => (
  <Card
    hoverable
    cover={<img alt="" src={image} style={{aspectRatio: 16 / 9, objectFit: "contain"}} />}
  >
    <Meta  description={"$" + price} />
    {showBuy && <PayButton tokenId={tokenId}/>}
  </Card>
);

export default ProductCard;