import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  FC,
  ReactElement,
} from 'react';
import './SlideContainer.scss';
import Slide from '../Slide/Slide';
import Arrows from '../Arrows/Arrows';
import Dots from '../Dots/Dots';
import {
  getElementDimensions,
  getPositionX,
} from '../../helperFunctions/utils';

interface SlideContainerProps {
  children: ReactElement[];
  activeIndex: number;
  threshold: number;
  transition: number;
  scaleOnDrag: boolean;
}

const SlideContainer: FC<SlideContainerProps> = ({
  children,
  activeIndex = 0,
  threshold = 100,
  transition = 0.3,
  scaleOnDrag = false,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  // const currentIndex = useRef(activeIndex);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(activeIndex || 0)

  const setPositionByIndex = useCallback(
    (w = dimensions.width) => {
      // currentTranslate.current = currentIndex.current * -w;
      currentTranslate.current = currentIndex * -w
      prevTranslate.current = currentTranslate.current;
      setSliderPosition();
    },
    [dimensions.width/**, currentIndex.current , currentIndex**/]
  );

  // const setPositionByIndex = 
  //   (w = dimensions.width) => {
  //     // currentTranslate.current = currentIndex.current * -w;
  //     currentTranslate.current = currentIndex * -w
  //     prevTranslate.current = currentTranslate.current;
  //     setSliderPosition();
  //   }
    
  

  const transitionOn = () =>
    (slideContainerRef.current.style.transition = `transform ${transition}s ease-out`);

  const transitionOff = () =>
    (slideContainerRef.current.style.transition = 'none');

  useEffect(() => {
    // if (activeIndex !== currentIndex.current) {
      if (activeIndex !== currentIndex) {
      transitionOn();
      // currentIndex.current = activeIndex;
      setCurrentIndex(activeIndex)
      setPositionByIndex();
    }
  }, [activeIndex, setPositionByIndex]);

  useLayoutEffect(() => {
    setDimensions(getElementDimensions(slideContainerRef));

    setPositionByIndex(getElementDimensions(slideContainerRef).width);
  }, [setPositionByIndex]);

  const increment = () => {
    transitionOn();
    // if (currentIndex.current >= children.length - 1) {
      if (currentIndex >= children.length - 1) {
      return;
    }
    // currentIndex.current += 1;
    setCurrentIndex(currentIndex + 1);
    setPositionByIndex();
    // console.log(currentIndex.current, 'increment')
  };

  const decrement = () => {
    transitionOn();
    // if (currentIndex.current <= 0) {
      if (currentIndex <= 0) {
      
      return;
    }
    // currentIndex.current -= 1;
    setCurrentIndex(currentIndex -1)
    setPositionByIndex();
    // console.log(currentIndex.current, 'decrement')
  };

  useEffect(() => {
    const handleResize = () => {
      transitionOff();
      const { width, height } = getElementDimensions(slideContainerRef);
      setDimensions({ width, height });
      setPositionByIndex(width);
    };

    const handleKeyDown = ({ key }: { key: string }) => {
      const arrowsPressed = ['ArrowRight', 'ArrowLeft'].includes(key);
      if (arrowsPressed) transitionOn();
      if (key === 'ArrowRight') {
        increment();
      }
      if (key === 'ArrowLeft') {
        decrement();
      }

      setPositionByIndex();
    };

    const handleTransitionEnd = () => {
      // console.log(currentIndex)
      // if (currentIndex.current === children.length - 1) {
        if (currentIndex === children.length - 1) {
        transitionOff();
        // currentIndex.current = 1;
        setCurrentIndex(1)
      }
      // if (currentIndex.current === 0) {
        if (currentIndex === 0) {
        
        transitionOff();
        // currentIndex.current = children.length - 2;
        setCurrentIndex(children.length - 2)
      }

      setPositionByIndex();
    };

    window.addEventListener('transitionend', handleTransitionEnd);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('transitionend', handleTransitionEnd);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [children.length, setPositionByIndex]);

  const touchStart = (index: number) => {
    return (
      event: React.TouchEvent<Element> | React.MouseEvent<Element, MouseEvent>
    ) => {
      transitionOn();
      // currentIndex.current = index;
      setCurrentIndex(index)
      startPos.current = getPositionX(event);
      dragging.current = true;
      animationRef.current = requestAnimationFrame(animation);
      slideContainerRef.current.style.cursor = 'grabbing';
    };
  };

  const touchMove = (
    event: React.TouchEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => {
    if (dragging.current) {
      const currentPosition = getPositionX(event);
      currentTranslate.current =
        prevTranslate.current + currentPosition - startPos.current;
    }
  };

  const touchEnd = () => {
    transitionOn();
    cancelAnimationFrame(animationRef.current);
    dragging.current = false;
    const movedBy = currentTranslate.current - prevTranslate.current;

    if (movedBy < -threshold) {
      increment();
    }

    if (movedBy > threshold) {
      decrement();
    }
    setPositionByIndex();
    slideContainerRef.current.style.cursor = 'grab';
    console.log(currentIndex, 'touchend')
  };

  const animation = () => {
    setSliderPosition();
    if (dragging.current) requestAnimationFrame(animation);
  };

  const setSliderPosition = () => {
    slideContainerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
  };

  const dotsHandler = (index: number) => {
    // currentIndex.current = index;
    setCurrentIndex(index)
    setPositionByIndex();
    // console.log(currentIndex.current, 'dotsHandler')
  };

  
//  console.log(currentIndex.current, 'at end')
 
//  useEffect(() => {
//    console.log(currentIndex.current, 'from parent')
//  }, [])

  return (
    <div className='SlideContainerWrapper'>
      <Arrows increment={increment} decrement={decrement} />
      <div ref={slideContainerRef} className='SlideContainerStyles'>
        {children.map((child, index) => {
          return (
            <div
              key={index}
              onTouchStart={touchStart(index)}
              onMouseDown={touchStart(index)}
              onTouchMove={touchMove}
              onMouseMove={touchMove}
              onTouchEnd={touchEnd}
              onMouseUp={touchEnd}
              onMouseLeave={() => {
                if (dragging.current) touchEnd();
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className='slideOuter'
            >
              <Slide
                child={child}
                sliderwidth={dimensions.width}
                sliderheight={dimensions.height}
                scaleOnDrag={scaleOnDrag}
              />
            </div>
          );
        })}
      </div>
      <Dots
        slides={children}
        // activeInd={currentIndex.current}
        activeInd={currentIndex}
        dotsHandler={dotsHandler}
      />
    </div>
  );
};

export default SlideContainer;
