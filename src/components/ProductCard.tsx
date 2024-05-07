import React from 'react';
import { PayButton } from './PayButton';
import { Card } from 'antd';

const { Meta } = Card;

interface MyComponentProps {
    product: {
      image: string;
      price: number;
      showBuy?: boolean;
    };
  }

const ProductCard: React.FC<MyComponentProps> = ({ product: { image, price, showBuy = false } }) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="" src={image} />}
  >
    <Meta  description={"$" + price} />
    {showBuy && <PayButton price={price}/>}
  </Card>
);

export default ProductCard;