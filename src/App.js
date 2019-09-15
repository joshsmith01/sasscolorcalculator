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
      colorEnd: colorEndHsl,
      colorStartString: colors.colorStart,
      colorEndString: colors.colorEnd,
    }));
    setColors({
      colorStart: '#eeeeee',
      colorEnd: '#ff0000'
    })
  };

  useEffect(() => {
    getColorDifferences(colorsHsl.colorStart, colorsHsl.colorEnd);
    getColorFunction(colors.colorStart, differences);
  }, [colorsHsl]);

  var differences = [];
  function  getColorDifferences(start, end) {
    if(isNaN(end[0])) {
      return
    }
    for (let i = 0; i < 3; i++) {
      differences[i] = start[i] - end[i];
    }
    return (differences);
  }

  function getColorFunction(colorString, hslDifferences) {
    if(isNaN(hslDifferences[0])) {
      return
    }
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
    setColorFunctionArray([...colorFunctionArray, colorString]);
    return (colorString);
  }

  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" name="colorStart" placeholder="Start #dad" onChange={handleChange}/>
          <input type="text" name="colorEnd" placeholder="End #ee00ff" onChange={handleChange}/>
          <button type="submit" value="Sassify">Sassify</button>
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

        {colorFunctionArray.map((item, index)  => (
          <div className="color-display-history" key={index}>
            <code>{item}</code>
            <div className="color-card color-card-start" style={{background: colorsHsl.colorStartString}}>
              Start Color {colorsHsl.colorStartString}
            </div>
            <div className="color-card color-card-end" style={{background: colorsHsl.colorEndString}}>
              End Color {colorsHsl.colorEndString}
            </div>
          </div>
        ))}



      </div>
  );
}

export default App;
