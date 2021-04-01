import React, { FC, ReactElement, useEffect } from 'react';
import './Dots.scss';

interface DotsProps {
  slides: ReactElement[];
  activeInd: number;
  dotsHandler: (index: number) => void;
}

const Dots: FC<DotsProps> = ({ slides, activeInd, dotsHandler }) => {
  console.log(activeInd, 'dots');

  return (
    <div className='dots-wrapper'>
      {slides.slice(1, -1).map((_item, index) => {
        return (
          <div
            key={index}
            className={`dot ${activeInd === index + 1 && 'active'}`}
            onClick={() => dotsHandler(index + 1)}
          ></div>
        );
      })}
    </div>
  );
};

export default Dots;
