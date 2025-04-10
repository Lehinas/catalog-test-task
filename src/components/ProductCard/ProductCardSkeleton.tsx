import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TitleSkeleton = styled.div`
  height: 1.25rem;
  width: 80%;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const PriceSkeleton = styled.div`
  height: 1.25rem;
  width: 40%;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const ButtonSkeleton = styled.div`
  height: 2rem;
  width: 45%;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const ProductCardSkeleton: React.FC = () => {
    return (
        <Card>
            <ImageContainer />
            <CardContent>
                <TitleSkeleton />
                <PriceSkeleton />
                <ButtonsContainer>
                    <ButtonSkeleton />
                    <ButtonSkeleton />
                </ButtonsContainer>
            </CardContent>
        </Card>
    );
};

export default ProductCardSkeleton;