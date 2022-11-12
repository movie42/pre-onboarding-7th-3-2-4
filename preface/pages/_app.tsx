import "../styles/font.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
