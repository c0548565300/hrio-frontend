import "@chakra-ui/react"

declare module "@chakra-ui/react" {
  interface ButtonVariantMap {
    variant: "solid" | "outline" | "subtle" | "surface" | "ghost" | "plain" | "glow"
  }
}