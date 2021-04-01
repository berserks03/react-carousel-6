import { TouchEvent, MouseEvent, MutableRefObject } from "react";

export const getPositionX = (event: TouchEvent | MouseEvent) => {
  if (event.nativeEvent instanceof TouchEvent) {
    return event.nativeEvent.touches[0].clientX;
  }
  if (event.nativeEvent instanceof MouseEvent) {
    return event.nativeEvent.pageX;
  }
};

export const getElementDimensions = (ref: MutableRefObject<HTMLElement>) => {
  const width = ref.current.clientWidth;
  const height = ref.current.clientHeight;
  return { width, height };
};
