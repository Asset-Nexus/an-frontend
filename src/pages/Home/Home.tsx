import { Carousel, Typography } from 'antd';
import React from 'react';
import image1 from '../../assets/images/original-83c2fbf9b52c2351fcd42796f89e3193.png'
import image2 from '../../assets/images/61af2e2868298004e89171da_Community-Icon.png'
import { AssetList } from '../AssetList';
import styled from '@emotion/styled';
import { Content } from 'antd/es/layout/layout';


const Title = styled(Typography.Title)`
font-family: MuseoModerno;
font-size: 32px;
font-weight: 700;
line-height: 40px;
letter-spacing: -0.40799999237060547px;
text-align: center;
`
const SectionTitle = styled(Typography.Title)`
font-family: MuseoModerno;
font-size: 24px;
font-weight: 700;
line-height: 40px;
letter-spacing: -0.40799999237060547px;
text-align: left;

`
const App = () => {
  const carouselData = [
    { image: image1, caption: 'Caption 1' },
    { image: image2, caption: 'Caption 2' },
  ];

  return (
    <>
      <Title level={1}>
        Leading NFT Platform
      </Title>
      <Carousel autoplay>
        {carouselData.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={`Slide ${index + 1}`} style={{ width: "100%", height: 500, objectFit: "cover" }} />
          </div>
        ))}
      </Carousel>
      <Content style={{ padding: '1em 0 0 48px' }}>
        <SectionTitle>Hottest</SectionTitle>
        <AssetList />
      </Content>
    </>
  );
};

export default App;