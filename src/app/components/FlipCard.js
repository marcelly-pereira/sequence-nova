import React from 'react';
import styled from 'styled-components';

const StyledFlipCard = styled.div`
  .automation-card {
    width: 100%;
    height: 200px;
    perspective: 1000px;
  }

  .automation-card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s;
  }

  .automation-card:hover .automation-card-inner {
    transform: rotateY(180deg);
  }

  .automation-card-front,
  .automation-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .automation-card-front {
    background-color: white;
    border: 1px solid #E5E7EB;
    transform: rotateY(0deg);
    padding: 1.5rem;
    justify-content: space-between;
  }

  .automation-card-back {
    background-color: white;
    transform: rotateY(180deg);
    padding: 1.5rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const FlipCard = ({ 
  frontContent, 
  backContent 
}) => {
  return (
    <StyledFlipCard>
      <div className="automation-card hover:border-[#005efc] group transition-colors duration-200">
        <div className="automation-card-inner">
          <div className="automation-card-front">
            {frontContent}
          </div>
          <div className="automation-card-back">
            {backContent}
          </div>
        </div>
      </div>
    </StyledFlipCard>
  );
};

export default FlipCard;