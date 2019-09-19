import React, { useEffect, useState } from 'react'
import './App.scss'
import Color from 'color'
import Particles from 'react-particles-js'
import { Spring } from 'react-spring/renderprops'
import simpleColors from './util/simpleColors'
import particlesConfig from './util/particlesConfig'
import ColorCard from './components/ColorCard'
import { Ocotcat } from './util/ocotcat'

const cleanColorString = colorString => {
  // strip any leading #
  if (colorString.charAt(0) === '#') {
    // remove # if any
    // eslint-disable-next-line no-param-reassign
    colorString = colorString.substr(1, 6)
  }

  // eslint-disable-next-line no-param-reassign
  colorString = colorString.replace(/ /g, '')
  // eslint-disable-next-line no-param-reassign
  colorString = colorString.toLowerCase()

  return colorString
}

const convertColorStringToHex = colorString => {
  let colorStringHex = colorString
  // before getting into regexps, try simple matches
  // eslint-disable-next-line
  if (simpleColors.hasOwnProperty(colorString)) {
    colorStringHex = simpleColors[colorString]
  }
  return colorStringHex
}

const App = () => {
  const [colors, setColors] = useState({
    colorStart: 'eeeeee',
    colorEnd: 'ff0000',
  })
  const [colorsHsl, setColorsHsl] = useState({
    colorStart: [],
    colorEnd: [],
  })
  const [colorFunctionArray, setColorFunctionArray] = useState([])
  const [isValidationError, setIsValidationError] = useState(false)
  const differences = []

  const handleChange = event => {
    event.persist()
    setColors(previousValues => ({
      ...previousValues,
      [event.target.name]: cleanColorString(
        convertColorStringToHex(event.target.value)
      ),
    }))
    setIsValidationError(false)
  }

  const verifyHexColor = colorString => {
    const pattern = new RegExp('^#([a-fA-F0-9]){3}$|[a-fA-F0-9]{6}$')
    if (!pattern.test(colorString)) {
      setIsValidationError(true)
    }
    return pattern.test(colorString)
  }

  function getColorDifferences(start, end) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(end[0])) {
      return
    }
    for (let i = 0; i < 3; i += 1) {
      differences[i] = start[i] - end[i]
    }
    return differences
  }

  function getColorFunction(colorString, hslDifferences) {
    let colorStringHsl = colorString
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(hslDifferences[0])) {
      return
    }
    // H
    if (hslDifferences[0] !== 0) {
      // if hue changes
      // eslint-disable-next-line vars-on-top
      const invH = hslDifferences[0] * -1
      const hueFunction = 'adjust-hue'
      // eslint-disable-next-line no-param-reassign
      colorStringHsl = `${hueFunction} ( ${colorString}, ${invH}deg )`
    }
    // S
    if (hslDifferences[1] < 0) {
      // if second color is more saturated
      const absS = Math.abs(hslDifferences[1])
      colorStringHsl = `saturate( ${colorString}, ${absS} )`
    } else if (hslDifferences[1] > 0) {
      // if second color is less saturated
      colorStringHsl = `desaturate( ${colorString}, ${hslDifferences[1]} )`
    }
    // L
    if (hslDifferences[2] < 0) {
      // if second color is lighter
      const absL = Math.abs(hslDifferences[2])
      colorStringHsl = `lighten( ${colorString}, ${absL} )`
    } else if (hslDifferences[2] > 0) {
      // if second color is darker
      colorStringHsl = `darken( ${colorString}, ${hslDifferences[2]})`
    }
    setColorFunctionArray([
      ...colorFunctionArray,
      {
        colorFunction: colorStringHsl,
        colors: {
          colorStartString: colors.colorStart,
          colorEndString: colors.colorEnd,
        },
      },
    ])
    return colorStringHsl
  }
  const handleSubmit = event => {
    event.preventDefault()
    if (
      verifyHexColor(`#${colors.colorStart}`) &&
      verifyHexColor(`#${colors.colorEnd}`)
    ) {
      try {
        const colorStartHsl = Color(`#${colors.colorStart}`)
          .hsl()
          .array()
        const colorEndHsl = Color(`#${colors.colorEnd}`)
          .hsl()
          .array()
        // eslint-disable-next-line no-shadow
        setColorsHsl(colorsHsl => ({
          ...colorsHsl,
          colorStart: colorStartHsl,
          colorEnd: colorEndHsl,
          colorStartString: colors.colorStart,
          colorEndString: colors.colorEnd,
        }))
      } catch (e) {
        console.error('There was a problem: ', e)
      }
    } else {
      console.warn(
        'Validate your color string input. Your string should be a HEX value; 3 or 6 characters. #eee or' +
          ' #e1e1e1'
      )
    }
  }

  useEffect(() => {
    getColorDifferences(colorsHsl.colorStart, colorsHsl.colorEnd)
    getColorFunction(`#${colors.colorStart}`, differences)
  }, [colorsHsl])

  return (
    <>
      <Particles className="particles" params={particlesConfig} />
      <div className="App">
        <div className="app-intro">
          <h1>Sass Color Calculator</h1>
          <p>Determine the sass function that derives one color from another</p>
        </div>
        <div className="color-display">
          <div className="color-card-container">
            <ColorCard
              colorString={colors.colorStart}
              position="start"
              isHistorical={false}
            />
            <ColorCard
              colorString={colors.colorEnd}
              position="end"
              isHistorical={false}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="color-start">
              Start
              <input
                id="color-start"
                type="text"
                name="colorStart"
                placeholder="#dad or ddaadd"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="color-end">
              End
              <input
                id="color-end"
                type="text"
                name="colorEnd"
                placeholder="080 or green"
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit" value="Sassify">
            Sassify
          </button>
        </form>
        {isValidationError && (
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {() => (
              <div className="color-display-history">
                <p>There is a problem with the color input string.</p>
                <p>
                  Check to make sure the spelling is correct or that the hex
                  code is <code>#ecf</code> or <code>#eeccff</code> or{' '}
                  <code>ecf</code> or <code>eeccff</code> or <code>green</code>
                </p>
              </div>
            )}
          </Spring>
        )}

        {colorFunctionArray.reverse().map((item, index) => (
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={index}>
            {props => (
              <div style={props} className="color-display-history">
                <div className="color-card-container">
                  <code>{item.colorFunction}</code>
                  <ColorCard
                    colorString={item.colors.colorStartString}
                    position="start"
                    isHistorical
                  />
                  <ColorCard
                    colorString={item.colors.colorEndString}
                    position="end"
                    isHistorical
                  />
                </div>
              </div>
            )}
          </Spring>
        ))}
      </div>

      <footer>
        <p>
          Built by Josh at{' '}
          <a href="https://www.efficiencyofmovement.com">
            Efficiency of Movement
          </a>
        </p>
        <p className="footer-links">
          <a href="https://app.netlify.com/sites/peaceful-murdock-cbed5f/deploys">
            <img
              src="https://api.netlify.com/api/v1/badges/966f718c-dbce-4253-894b-980e3e16980e/deploy-status"
              alt="Netlify Deploy status for Sass Color Calculator"
            />
          </a>
          <a href="https://github.com/prettier/prettier">
            <img
              src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
              alt="Code Style by Prettier"
            />
          </a>
          <Ocotcat />
        </p>
      </footer>
    </>
  )
}

export default App
