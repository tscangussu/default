const { resolve } = require("path");

export default (config, env, helpers) => {
  // Exclude Goober from the output bundle
  if (env.ssr) {
    config.externals = { ...config.externals, goober: "goober" };
  }

  // Add function to extract CSS styles to HtmlWebpackPlugin
  // when prerendering components
  if (!env.ssr) {
    const htmlWebpackPluginConfig = helpers.getPluginsByName(
      config,
      "HtmlWebpackPlugin"
    )[0];
    const { plugin: htmlWebpackPlugin } = htmlWebpackPluginConfig;

    htmlWebpackPlugin.options.goober = () => {
      const preact = require("preact");
      const render = require("preact-render-to-string");
      const { extractCss } = require("goober");

      const _url = htmlWebpackPlugin.options.url;
      const entry = resolve(config.output.path, "ssr-build/ssr-bundle.js");
      const m = require(entry);
      const app = (m && m.default) || m;
      if (typeof app !== "function") {
        return "";
      }
      const renderToString = render(preact.h(app, { url: _url }));
      const styles = extractCss();

      if (htmlWebpackPlugin.options.config.prerender) {
        return `<style id="_goober">${styles}</style>`;
      }
      return "";
    };
  }

  return config;
};
