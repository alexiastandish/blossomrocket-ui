import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//  Uses figma plugin called Design Tokens Export
const sourcePath = path.resolve(__dirname, 'theme-config.json')
const targetColorsPath = path.resolve(__dirname, 'lib/theme/colors.css')
const targetTypographyPath = path.resolve(__dirname, 'lib/theme/typography.css')
const targetGlobalPath = path.resolve(__dirname, 'lib/index.css')

const getColorVariables = (colors) => {
  const colorConfig = {}
  for (const colorKey in colors) {
    const colorShades = colors[colorKey]
    for (const [shade, { $value }] of Object.entries(colorShades)) {
      colorConfig[`--color-${colorKey}-${shade}`] = $value
    }
  }
  return colorConfig
}

const remCalc = (px) => {
  // converts to rem using base of 16 (1/16 = 0.0625) and appends 'rem'
  return 0.0625 * parseInt(px) + 'rem'
}

const getTypeConfig = (prefix, config = {}) => {
  const typeConfig = {}
  for (const typeKey in config) {
    const attributes = config[typeKey]
    for (const [attr, { $value }] of Object.entries(attributes)) {
      typeConfig[`--${prefix}-${typeKey}-${attr}`] = typeof $value === 'string' ? $value : remCalc($value)
    }
  }
  return typeConfig
}

const getTypeVariables = (type) => {
  return {
    ...getTypeConfig('heading', type.heading),
    ...getTypeConfig('body', type.body)
  }
}

// Update and inject existing css with the new variables
function updateAndInjectThemeVars(targetContent, newVars) {
  const existingVars = new Set()

  // Replace existing vars and collect which ones exist
  const updatedContent = targetContent.replace(/(--[\w-]+):\s*([^;]+);/g, (match, fullVarName) => {
    existingVars.add(fullVarName)
    return newVars[fullVarName] ? `${fullVarName}: ${newVars[fullVarName]};` : match
  })

  // Prep and inject any missing vars
  const missing = Object.entries(newVars)
    .filter(([key]) => !existingVars.has(key))
    .map(([key, val]) => `  ${key}: ${val};`)

  if (missing.length === 0) return updatedContent

  return updatedContent.replace(/@theme\s*{/, (match) => {
    return `${match}\n  /* Injected new tokens */\n${missing.join('\n')}`
  })
}

// Injects import statements at the top of the target global CSS file
async function injectImports(filePath, lines) {
  const original = await fs.readFile(filePath, 'utf-8')
  // Filter out lines that already exist in the original file
  const filtered = lines.filter((line) => !original.includes(line))

  const injection = filtered.join('\n') + '\n'
  const updated = injection + original

  await fs.writeFile(filePath, updated)
  console.log(`Injected imports at top of ${path.basename(filePath)}`)
}

async function updateTheme() {
  const figmaConfig = await fs.readFile(sourcePath, 'utf-8')
  const targetColorsCSS = await fs.readFile(targetColorsPath, 'utf-8')
  const targetTypographyCSS = await fs.readFile(targetTypographyPath, 'utf-8')
  const { colors, type, imports = [] } = JSON.parse(figmaConfig)

  // shape exported figma tokens / styles to css variables
  const colorVariables = getColorVariables(colors)
  const typeVariables = getTypeVariables(type)
  const updatedColors = updateAndInjectThemeVars(targetColorsCSS, colorVariables)
  const updatedType = updateAndInjectThemeVars(targetTypographyCSS, typeVariables)

  await fs.writeFile(targetColorsPath, updatedColors)
  await fs.writeFile(targetTypographyPath, updatedType)
  await injectImports(targetGlobalPath, imports)
  console.log('CSS files updated!')
}

updateTheme()
