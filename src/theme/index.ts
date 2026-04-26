import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      glow: {
        bg: "brand.500",
        color: "white",
        borderRadius: "full",
        transition: "all 0.2s",
        _hover: {
          bg: "brand.600",
          transform: "translateY(-2px)",
          boxShadow: "0 0 20px {colors.brand.500}", 
        },
        _active: {
          transform: "translateY(0)",
        }
      },
    },
  },
})

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#EEF2FF" },
          100: { value: "#E0E7FF" },
          200: { value: "#C7D2FE" },
          300: { value: "#A5B4FC" },
          400: { value: "#818CF8" },
          500: { value: "#6366F1" },
          600: { value: "#4F46E5" },
          700: { value: "#4338CA" },
          800: { value: "#3730A3" },
          900: { value: "#312E81" },
        },
        neon: {
          cyan: { value: "#22D3EE" },
        }
      },
    },
    semanticTokens: {
      colors: {
        glassBg: { value: "rgba(255, 255, 255, 0.7)" },
        glassBorder: { value: "rgba(255, 255, 255, 0.2)" },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)