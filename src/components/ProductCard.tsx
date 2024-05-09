import React from 'react';
import { PayButton } from './PayButton';
import { Card } from 'antd';
import styled from 'styled-components';

const Button = styled(PayButton)`
  color: hotpink;
  margin: 20px;
`

const { Meta } = Card;

interface MyComponentProps {
    product: {
      image: string;
      price: string;
      tokenId: number;
      showBuy?: boolean;
    };
  }

const ProductCard: React.FC<MyComponentProps> = ({ product: { image, price, tokenId, showBuy = false } }) => (
  <Card
    // hoverable
    cover={<img alt="" src={image} style={{aspectRatio: 16 / 9, objectFit: "cover"}} />}
    style={{borderRadius: 8, background: "#1C1C1C", color: "#FFFFFF"}}
    bordered={false}
  >
    <Meta description={<span style={{color: "white"}}>{"$" + price}</span>} />

    {showBuy && <Button price={price} tokenId={tokenId} />}
  </Card>
);

export default ProductCard;