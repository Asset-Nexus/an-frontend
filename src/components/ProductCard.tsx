import React from 'react';
import { PayButton } from './PayButton';
import { Card } from 'antd';

const { Meta } = Card;

interface MyComponentProps {
    product: {
      image: string;
      name: string;
      price: number;
    };
  }

const ProductCard: React.FC<MyComponentProps> = ({ product }) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt={product.name} src={product.image} />}
  >
    <Meta title={product.name} description={"$" + product.price} />
    <p>ksdksdksdk</p>
    <PayButton price={product.price}/>
  </Card>
);

export default ProductCard;