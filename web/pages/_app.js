import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import Header from "@components/core-components/Header";
import createEmotionCache from '../styles/createEmotionCache';
import "/styles/globals.css";
import theme from '../styles/theme';
import Footer from "@components/core-components/Footer";
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from "@web3-react/core";
import { Container } from '@mui/material';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>NFT with Merkle Whitelist Web3 Scaffold</title>
        <meta name  ="viewport" content="initial-scale=1, width=device-width" />
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KYMQ20WGB4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KYMQ20WGB4', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container sx={{bgcolor: 'secondary.main', minHeight: '100vh', margin: 0, 'minWidth': '100%'}}
          style={{padding: 0, fontFamily: 'IntegralCF'}}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
        </Web3ReactProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
