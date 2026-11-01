import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import App from "./App.jsx";
import { ColorModeProvider } from "./components/ui/color-mode.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const config = defineConfig({
  globalCss: {
    "html, body": {
      bg: "gray.100",
      color: "gray.800",
      _dark: {
        bg: "#000",
        color: "white",
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
