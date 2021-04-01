import React from 'react';
import './App.scss';
import Slider from './components/Slider/Slider';
import imageSrc from './assets/links';

const App = () => {
  return (
    <Slider
      items={[
        <h1>First</h1>,
        <img src={imageSrc[0]} />,
        <h1>Hi 3</h1>,
        <img src={imageSrc[1]} />,
        <p>Hello world 5</p>,
        <img src={imageSrc[2]} />,
        <p>Last</p>,
      ]}
    />
  );
};

export default App;
