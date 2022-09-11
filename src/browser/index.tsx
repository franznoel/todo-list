// Load polyfills (once, on the top of our web app)
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./index.css";

/**
 * Frontend code running in browser
 */
import * as React from "react";
import { hydrate } from "react-dom";

import ConfigContext from "../components/ConfigContext";
import { Config } from "../server/config";
import App from "../App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;

const queryClient = new QueryClient();

/** Components added here will _only_ be loaded in the web browser, never for server-side rendering */
const render = () => {
  hydrate(
    <>
      {/* The configuration is the outmost component. This allows us to read the configuration even in the theme */}
      <React.StrictMode>
        <ConfigContext.Provider value={config}>
          <QueryClientProvider client={queryClient} contextSharing>
            <App />
            <ReactQueryDevtools/>
          </QueryClientProvider>
        </ConfigContext.Provider>
      </React.StrictMode>
    </>,
    document.getElementById("root"),
  );
};

render();
