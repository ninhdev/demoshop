// vite.config.ts
import { defineConfig } from "file:///C:/Users/RodriNguyen/Desktop/hydrogendemo/demoshop/node_modules/vite/dist/node/index.js";
import { hydrogen } from "file:///C:/Users/RodriNguyen/Desktop/hydrogendemo/demoshop/node_modules/@shopify/hydrogen/dist/vite/plugin.js";
import { oxygen } from "file:///C:/Users/RodriNguyen/Desktop/hydrogendemo/demoshop/node_modules/@shopify/mini-oxygen/dist/vite/plugin.js";
import { vitePlugin as remix } from "file:///C:/Users/RodriNguyen/Desktop/hydrogendemo/demoshop/node_modules/@remix-run/dev/dist/index.js";
import tsconfigPaths from "file:///C:/Users/RodriNguyen/Desktop/hydrogendemo/demoshop/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true
      }
    }),
    tsconfigPaths()
  ],
  ssr: {
    optimizeDeps: {
      include: ["typographic-base"]
    }
  },
  optimizeDeps: {
    include: [
      "clsx",
      "@headlessui/react",
      "typographic-base",
      "react-intersection-observer",
      "react-use/esm/useScroll",
      "react-use/esm/useDebounce",
      "react-use/esm/useWindowScroll"
    ]
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxSb2RyaU5ndXllblxcXFxEZXNrdG9wXFxcXGh5ZHJvZ2VuZGVtb1xcXFxkZW1vc2hvcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcUm9kcmlOZ3V5ZW5cXFxcRGVza3RvcFxcXFxoeWRyb2dlbmRlbW9cXFxcZGVtb3Nob3BcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1JvZHJpTmd1eWVuL0Rlc2t0b3AvaHlkcm9nZW5kZW1vL2RlbW9zaG9wL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQge2h5ZHJvZ2VufSBmcm9tICdAc2hvcGlmeS9oeWRyb2dlbi92aXRlJztcclxuaW1wb3J0IHtveHlnZW59IGZyb20gJ0BzaG9waWZ5L21pbmktb3h5Z2VuL3ZpdGUnO1xyXG5pbXBvcnQge3ZpdGVQbHVnaW4gYXMgcmVtaXh9IGZyb20gJ0ByZW1peC1ydW4vZGV2JztcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIGh5ZHJvZ2VuKCksXHJcbiAgICBveHlnZW4oKSxcclxuICAgIHJlbWl4KHtcclxuICAgICAgcHJlc2V0czogW2h5ZHJvZ2VuLnByZXNldCgpXSxcclxuICAgICAgZnV0dXJlOiB7XHJcbiAgICAgICAgdjNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXHJcbiAgICAgICAgdjNfcmVsYXRpdmVTcGxhdFBhdGg6IHRydWUsXHJcbiAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcclxuICAgICAgICB2M19sYXp5Um91dGVEaXNjb3Zlcnk6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIHRzY29uZmlnUGF0aHMoKSxcclxuICBdLFxyXG4gIHNzcjoge1xyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFsndHlwb2dyYXBoaWMtYmFzZSddLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1xyXG4gICAgICAnY2xzeCcsXHJcbiAgICAgICdAaGVhZGxlc3N1aS9yZWFjdCcsXHJcbiAgICAgICd0eXBvZ3JhcGhpYy1iYXNlJyxcclxuICAgICAgJ3JlYWN0LWludGVyc2VjdGlvbi1vYnNlcnZlcicsXHJcbiAgICAgICdyZWFjdC11c2UvZXNtL3VzZVNjcm9sbCcsXHJcbiAgICAgICdyZWFjdC11c2UvZXNtL3VzZURlYm91bmNlJyxcclxuICAgICAgJ3JlYWN0LXVzZS9lc20vdXNlV2luZG93U2Nyb2xsJyxcclxuICAgIF0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgLy8gQWxsb3cgYSBzdHJpY3QgQ29udGVudC1TZWN1cml0eS1Qb2xpY3lcclxuICAgIC8vIHdpdGh0b3V0IGlubGluaW5nIGFzc2V0cyBhcyBiYXNlNjQ6XHJcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogMCxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVixTQUFRLG9CQUFtQjtBQUMvVyxTQUFRLGdCQUFlO0FBQ3ZCLFNBQVEsY0FBYTtBQUNyQixTQUFRLGNBQWMsYUFBWTtBQUNsQyxPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixTQUFTLENBQUMsU0FBUyxPQUFPLENBQUM7QUFBQSxNQUMzQixRQUFRO0FBQUEsUUFDTixtQkFBbUI7QUFBQSxRQUNuQixzQkFBc0I7QUFBQSxRQUN0QixxQkFBcUI7QUFBQSxRQUNyQix1QkFBdUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsa0JBQWtCO0FBQUEsSUFDOUI7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQTtBQUFBLElBR0wsbUJBQW1CO0FBQUEsRUFDckI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
