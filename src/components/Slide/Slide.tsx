import React, { FC, useRef, ReactElement } from 'react';
import './Slide.scss';

interface SlideProps {
  child: ReactElement;
  sliderwidth: number;
  sliderheight: number;
  scaleOnDrag: boolean;
}

const Slide: FC<SlideProps> = ({
  child,
  sliderwidth,
  sliderheight,
  scaleOnDrag = false,
}) => {
  const getStyle = () => {
    return {
      width:  `${sliderwidth}px` ,
      height: `${sliderheight}px`,
    };
  };

  const slideRef = useRef<HTMLDivElement>(null);

  const onMouseDown = () => {
    if (scaleOnDrag) slideRef.current.style.transform = 'scale(0.9)';
  };

  const onMouseUp = () => {
    if (scaleOnDrag) slideRef.current.style.transform = 'scale(1)';
  };
  return (
    <div
      ref={slideRef} 
      style={{width: `${sliderwidth}px`, height: `${sliderheight}px`}}    
      // sliderwidth={`${sliderwidth}px`}
      // sliderheight={`${sliderheight}px`}
      className='SlideStyles'
    >
      <div
        unselectable='on'
        className='slideInner'
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onMouseLeave={onMouseUp}
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
        style={getStyle()}
      >
        {child}
      </div>
    </div>
  );
};

export default Slide;
