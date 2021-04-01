import React, { FC, ReactElement } from 'react';
import './Slider.scss';
import SlideContainer from '../SlideContainer/SlideContainer';

interface SliderProps {
  items: ReactElement[];
}

const Slider: FC<SliderProps> = ({ items }) => {
  const last = items[items.length - 1];
  const first = items[0];
  const slideItems = [last, ...items, first];

  return (
    <div className='SliderStyles'>
      <SlideContainer
        activeIndex={2}
        threshold={100}
        transition={0.3}
        scaleOnDrag={true}
      >
        {slideItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </SlideContainer>
    </div>
  );
};

export default Slider;
