import React, {useEffect, useState} from 'react';
import './App.css';
import Color from 'color';

const App = () => {
  const [colors, setColors] = useState({
    colorStart: '#eeeeee',
    colorEnd: '#ff0000'
  });
  const [colorsHsl, setColorsHsl] = useState({
    colorStart: [],
    colorEnd: []
  });
  const [colorFunctionArray, setColorFunctionArray] = useState([]);

  const handleChange = (event) => {
    event.persist();
    setColors(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let colorStartHsl = Color(colors.colorStart).hsl().array();
    let colorEndHsl = Color(colors.colorEnd).hsl().array();
    setColorsHsl(colorsHsl => ({
      ...colorsHsl,
      colorStart: colorStartHsl,
      colorEnd: colorEndHsl
    }));
  };

  useEffect(() => {
    getColorDifferences(colorsHsl.colorStart, colorsHsl.colorEnd);
    getColorFunction(colors.colorStart, differences);
  }, [colorsHsl]);

  var differences = [];
  function getColorDifferences(start, end) {
    for (let i = 0; i < 3; i++) {
      differences[i] = start[i] - end[i];
    }
    console.log('differences: ',differences);
    return (differences);
  }

  function getColorFunction(colorString, hslDifferences) {
    // H
    if (hslDifferences[0] !== 0) { // if hue changes
      var invH = hslDifferences[0] * -1;
      var hueFunction = "adjust-hue";
      colorString = hueFunction + "( " + colorString + ", " + invH + "deg )";
    }
    // S
    if (hslDifferences[1] < 0) { // if second color is more saturated
      var absS = Math.abs(hslDifferences[1]);
      colorString = "saturate( " + colorString + ", " + absS + " )";
    } else if (hslDifferences[1] > 0) { // if second color is less saturated
      colorString = "desaturate( " + colorString + ", " + hslDifferences[1] + " )";
    }
    // L
    if (hslDifferences[2] < 0) { // if second color is lighter
      var absL = Math.abs(hslDifferences[2]);
      colorString = "lighten( " + colorString + ", " + absL + " )";
    } else if (hslDifferences[2] > 0) { // if second color is darker
      colorString = "darken( " + colorString + ", " + hslDifferences[2] + " )";
    }
    // Logs the hslDifferences to the console in an array. -JMS
    console.log('colorString: ',colorString);
    setColorFunctionArray([...colorFunctionArray, colorString]);
    return (colorString);
  }

  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" name="colorStart" placeholder="Base Color #dad" onChange={handleChange}/>
          <input type="text" name="colorEnd" placeholder="Result Color #ee00ff" onChange={handleChange}/>
          <input type="submit" value="Sassify"/>
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
