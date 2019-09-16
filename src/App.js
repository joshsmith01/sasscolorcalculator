import React, {useEffect, useState} from 'react';
import './App.css';
import Color from 'color';



const cleanColorString = (colorString) => {
  // strip any leading #
  if (colorString.charAt(0) === '#') { // remove # if any
    colorString = colorString.substr(1,6);
  }

  colorString = colorString.replace(/ /g,'');
  colorString = colorString.toLowerCase();

  return colorString
};

const convertColorStringToHex = (colorString) => {
  // before getting into regexps, try simple matches
  // and overwrite the input
  var simpleColors = {
    aliceblue: 'f0f8ff',
    antiquewhite: 'faebd7',
    aqua: '00ffff',
    aquamarine: '7fffd4',
    azure: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '000000',
    blanchedalmond: 'ffebcd',
    blue: '0000ff',
    blueviolet: '8a2be2',
    brown: 'a52a2a',
    burlywood: 'deb887',
    cadetblue: '5f9ea0',
    chartreuse: '7fff00',
    chocolate: 'd2691e',
    coral: 'ff7f50',
    cornflowerblue: '6495ed',
    cornsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: '00ffff',
    darkblue: '00008b',
    darkcyan: '008b8b',
    darkgoldenrod: 'b8860b',
    darkgray: 'a9a9a9',
    darkgrey: 'a9a9a9',
    darkgreen: '006400',
    darkkhaki: 'bdb76b',
    darkmagenta: '8b008b',
    darkolivegreen: '556b2f',
    darkorange: 'ff8c00',
    darkorchid: '9932cc',
    darkred: '8b0000',
    darksalmon: 'e9967a',
    darkseagreen: '8fbc8f',
    darkslateblue: '483d8b',
    darkslategray: '2f4f4f',
    darkslategrey: '2f4f4f',
    darkturquoise: '00ced1',
    darkviolet: '9400d3',
    deeppink: 'ff1493',
    deepskyblue: '00bfff',
    dimgray: '696969',
    dimgrey: '696969',
    dodgerblue: '1e90ff',
    firebrick: 'b22222',
    floralwhite: 'fffaf0',
    forestgreen: '228b22',
    fuchsia: 'ff00ff',
    gainsboro: 'dcdcdc',
    ghostwhite: 'f8f8ff',
    gold: 'ffd700',
    goldenrod: 'daa520',
    gray: '808080',
    grey: '808080',
    green: '008000',
    greenyellow: 'adff2f',
    honeydew: 'f0fff0',
    hotpink: 'ff69b4',
    indianred : 'cd5c5c',
    indigo : '4b0082',
    ivory: 'fffff0',
    khaki: 'f0e68c',
    lavender: 'e6e6fa',
    lavenderblush: 'fff0f5',
    lawngreen: '7cfc00',
    lemonchiffon: 'fffacd',
    lightblue: 'add8e6',
    lightcoral: 'f08080',
    lightcyan: 'e0ffff',
    lightgoldenrodyellow: 'fafad2',
    lightgray: 'd3d3d3',
    lightgrey: 'd3d3d3',
    lightgreen: '90ee90',
    lightpink: 'ffb6c1',
    lightsalmon: 'ffa07a',
    lightseagreen: '20b2aa',
    lightskyblue: '87cefa',
    lightslateblue: '8470ff',
    lightslategray: '778899',
    lightslategrey: '778899',
    lightsteelblue: 'b0c4de',
    lightyellow: 'ffffe0',
    lime: '00ff00',
    limegreen: '32cd32',
    linen: 'faf0e6',
    magenta: 'ff00ff',
    maroon: '800000',
    mediumaquamarine: '66cdaa',
    mediumblue: '0000cd',
    mediumorchid: 'ba55d3',
    mediumpurple: '9370d8',
    mediumseagreen: '3cb371',
    mediumslateblue: '7b68ee',
    mediumspringgreen: '00fa9a',
    mediumturquoise: '48d1cc',
    mediumvioletred: 'c71585',
    midnightblue: '191970',
    mintcream: 'f5fffa',
    mistyrose: 'ffe4e1',
    moccasin: 'ffe4b5',
    navajowhite: 'ffdead',
    navy: '000080',
    oldlace: 'fdf5e6',
    olive: '808000',
    olivedrab: '6b8e23',
    orange: 'ffa500',
    orangered: 'ff4500',
    orchid: 'da70d6',
    palegoldenrod: 'eee8aa',
    palegreen: '98fb98',
    paleturquoise: 'afeeee',
    palevioletred: 'd87093',
    papayawhip: 'ffefd5',
    peachpuff: 'ffdab9',
    peru: 'cd853f',
    pink: 'ffc0cb',
    plum: 'dda0dd',
    powderblue: 'b0e0e6',
    purple: '800080',
    rebeccapurple: '663399',
    red: 'ff0000',
    rosybrown: 'bc8f8f',
    royalblue: '4169e1',
    saddlebrown: '8b4513',
    salmon: 'fa8072',
    sandybrown: 'f4a460',
    seagreen: '2e8b57',
    seashell: 'fff5ee',
    sienna: 'a0522d',
    silver: 'c0c0c0',
    skyblue: '87ceeb',
    slateblue: '6a5acd',
    slategray: '708090',
    snow: 'fffafa',
    springgreen: '00ff7f',
    steelblue: '4682b4',
    tan: 'd2b48c',
    teal: '008080',
    thistle: 'd8bfd8',
    tomato: 'ff6347',
    turquoise: '40e0d0',
    violet: 'ee82ee',
    wheat: 'f5deb3',
    white: 'ffffff',
    whitesmoke: 'f5f5f5',
    yellow: 'ffff00',
    yellowgreen: '9acd32'
  };
  for (var key in simpleColors) {
    if (colorString === key) {
      colorString = simpleColors[key];
    }
  }
  return colorString
};



const App = () => {
  const [colors, setColors] = useState({
    colorStart: 'eeeeee',
    colorEnd: 'ff0000'
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
      [event.target.name]: cleanColorString(convertColorStringToHex(event.target.value)),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      let colorStartHsl = Color(`#${colors.colorStart}`).hsl().array();
      let colorEndHsl = Color(`#${colors.colorEnd}`).hsl().array();
      setColorsHsl(colorsHsl => ({
        ...colorsHsl,
        colorStart: colorStartHsl,
        colorEnd: colorEndHsl,
        colorStartString: colors.colorStart,
        colorEndString: colors.colorEnd,
      }));
    } catch (e) {
      console.error('There is an error: ', e)
    }

  };

  useEffect(() => {
    getColorDifferences(colorsHsl.colorStart, colorsHsl.colorEnd);
    getColorFunction(`#${colors.colorStart}`, differences);
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
    setColorFunctionArray([...colorFunctionArray, {colorFunction: colorString,colors: {
        colorStartString: colors.colorStart,
        colorEndString: colors.colorEnd,
      }}]);


    return (colorString);
  }


  //
  return (
      <div className="App">
        <div className="app-intro">
          <h1>Sass Color Calculator</h1>
          <p>Determine the sass function that derives one color from another</p>
        </div>
        <div className="color-display">
          <div className="color-card-container">
          <div className="color-card color-card-start" style={{background: `#${colors.colorStart}`}}>
             <span className="card-title">
               <code>{`#${colors.colorStart}`}</code>
             </span>
          </div>
          <div className="color-card color-card-end" style={{background: `#${colors.colorEnd}`}}>
            <span className="card-title">
              <code>{`#${colors.colorEnd}`}</code>
            </span>
          </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
          <label htmlFor="color-start">Start</label>
          <input id="color-start" type="text" name="colorStart" placeholder="#dad or ddaadd" onChange={handleChange}/>
          </div>
          <div className="input-container">
          <label htmlFor="color-end">End</label>
          <input id="color-end" type="text" name="colorEnd" placeholder="080 or green" onChange={handleChange}/>
          </div>
          <button type="submit" value="Sassify">Sassify</button>
        </form>


        {colorFunctionArray.reverse().map((item, index)  => (
          <div className="color-display-history" key={index}>
            <div className="color-card-container">
            <code>{item.colorFunction}</code>
            <div className="color-card color-card-start" style={{background: `#${item.colors.colorStartString}`}}>
              <span className="card-title">
                Start Color <code>{`#${item.colors.colorStartString}`}</code>
              </span>
            </div>
            <div className="color-card color-card-end" style={{background: `#${item.colors.colorEndString}`}}>
                <span className="card-title">
                  End Color  <code>{`#${item.colors.colorEndString}`}</code>
                </span>
            </div>
            </div>
          </div>
        ))}



      </div>
  );
}

export default App;
