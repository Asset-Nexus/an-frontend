import React from 'react';
import { PayButton } from './PayButton';
import { Card } from 'antd';

const { Meta } = Card;

interface MyComponentProps {
  product: {
    image: string;
    author?: string;
    title?: string;
    description?: string;
    tag?: string;
    tradeTime?: string;
    price?: string;
    tokenId?: number;
    showBuy?: boolean;
  };
}

const ProductCard: React.FC<MyComponentProps> = ({ product: { description, author, title, tag, tradeTime, image, price, tokenId, showBuy = false } }) => (
  <Card
    hoverable
    cover={<img alt="" src={image} style={{ aspectRatio: 16 / 9, objectFit: "cover" }} />}
    style={{ borderRadius: "2em", background: "#1C1C1C", color: "#FFFFFF" }}
    bordered={false}
  >
    {description && <Meta description={<span style={{ color: "white" }}>{description}</span>} />}
    {title && <div style={{ color: "white" }}>title: {title}</div>}
    {author && <div style={{ color: "white" }}>author: {author}</div>}
    {price && <Meta description={<span style={{ color: "white" }}>{"$ " + price}</span>} />}
    {tag && <div style={{ color: "white" }}>tag: {tag}</div>}
    {tradeTime && <div style={{ color: "white" }}>tradeTime: {tradeTime}</div>}
    {showBuy && <PayButton price={price} tokenId={tokenId} />}
  </Card>
);

export default ProductCard;