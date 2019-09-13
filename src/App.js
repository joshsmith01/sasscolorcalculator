import React, {useState} from 'react';
import './App.css';
import colorString from 'color-string';
import Color from 'color';

const App = () => {
  const [colors, setColors] = useState({
    colorStart: '#eeeeee',
    colorEnd: '#ff0000'
  });
  const [colorsHsl, setColorsHsl] = useState({
    colorStart: {},
    colorEnd: {}
  });

  const handleChange = (event) => {
    event.persist();
    setColors(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let colorStartHsl = Color(colors.colorStart);
    let colorEndHsl = Color(colors.colorEnd);
    setColorsHsl(colorsHsl => ({
      ...colorsHsl,
      colorStart: colorStartHsl,
      colorEnd: colorEndHsl
    }));
  };


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="colorStart" placeholder="Base Color #dad" onChange={handleChange} />
        <input type="text"  name="colorEnd" placeholder="Result Color #ee00ff" onChange={handleChange} />
        <input type="submit" value="Sassify"  />
      </form>
      <div className="color-display">
        <p>Click the color to copy its value</p>
        <div className="color-card color-card-start" style={{background: colors.colorStart}}>
          Start Color {colors.colorStart}
        </div>
        <div className="color-card color-card-end" style={{background: colors.colorEnd}}>
          End Color {colors.colorEnd}
        </div>
      </div>
    </div>
  );
}

export default App;
