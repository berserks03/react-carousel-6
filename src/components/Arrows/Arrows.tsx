import React, { FC } from 'react';
import './Arrows.scss';

interface ArrowProps {
  decrement: () => void;
  increment: () => void;
}

const Arrows: FC<ArrowProps> = ({ decrement, increment }) => {
  return (
    <>
      <button
        className='arrowLeft'
        onClick={decrement}
      >
        〈
      </button>
      <button
        className='arrowRight'
        onClick={increment}
      >
        〉
      </button>
    </>
  );
};

export default Arrows;
