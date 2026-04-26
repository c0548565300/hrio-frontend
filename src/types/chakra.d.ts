import "@chakra-ui/react"

declare module "@chakra-ui/react" {

  interface ButtonVariantMap {
    variant: "solid" | "outline" | "subtle" | "surface" | "ghost" | "plain" | "glow"
  }

  interface HTMLChakraProps<T extends React.ElementType> {
    variant?: "solid" | "outline" | "subtle" | "surface" | "ghost" | "plain" | "glow" | (string & {})
  }
}