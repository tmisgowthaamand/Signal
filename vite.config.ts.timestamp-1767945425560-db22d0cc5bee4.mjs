// vite.config.ts
import { defineConfig } from "file:///C:/Users/Admin/OneDrive/Desktop/New%20folder/signal/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Admin/OneDrive/Desktop/New%20folder/signal/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/Admin/OneDrive/Desktop/New%20folder/signal/node_modules/lovable-tagger/dist/index.js";
import basicSsl from "file:///C:/Users/Admin/OneDrive/Desktop/New%20folder/signal/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Admin\\OneDrive\\Desktop\\New folder\\signal";
var securityHeaders = {
  "X-Frame-Options": "DENY",
  // Prevent clickjacking
  "X-Content-Type-Options": "nosniff",
  // Prevent MIME type sniffing
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Control referrer information
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  // Disable unused APIs
  "X-XSS-Protection": "1; mode=block",
  // Enable XSS filtering
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  // Enforce HTTPS
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    // Required for React and Vite dev
    "style-src 'self' 'unsafe-inline'",
    // Required for inline styles
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'"
  ].join("; ")
};
var vite_config_default = defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const config = {
    server: {
      host: "::",
      port: 8080,
      ...isDev ? { https: {} } : {},
      headers: isDev ? securityHeaders : {}
    },
    preview: {
      headers: securityHeaders
      // For production preview
    },
    build: {
      sourcemap: isDev,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            vendor: ["react-router-dom"]
          }
        }
      }
    },
    plugins: [
      react(),
      isDev && basicSsl(),
      // Enable self-signed cert in development
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE5ldyBmb2xkZXJcXFxcc2lnbmFsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE5ldyBmb2xkZXJcXFxcc2lnbmFsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BZG1pbi9PbmVEcml2ZS9EZXNrdG9wL05ldyUyMGZvbGRlci9zaWduYWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcclxuaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCc7XHJcblxyXG4vLyBTZWN1cml0eSBoZWFkZXJzIGNvbmZpZ3VyYXRpb25cclxuY29uc3Qgc2VjdXJpdHlIZWFkZXJzID0ge1xyXG4gICdYLUZyYW1lLU9wdGlvbnMnOiAnREVOWScsIC8vIFByZXZlbnQgY2xpY2tqYWNraW5nXHJcbiAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsIC8vIFByZXZlbnQgTUlNRSB0eXBlIHNuaWZmaW5nXHJcbiAgJ1JlZmVycmVyLVBvbGljeSc6ICdzdHJpY3Qtb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luJywgLy8gQ29udHJvbCByZWZlcnJlciBpbmZvcm1hdGlvblxyXG4gICdQZXJtaXNzaW9ucy1Qb2xpY3knOiAnY2FtZXJhPSgpLCBtaWNyb3Bob25lPSgpLCBnZW9sb2NhdGlvbj0oKSwgcGF5bWVudD0oKScsIC8vIERpc2FibGUgdW51c2VkIEFQSXNcclxuICAnWC1YU1MtUHJvdGVjdGlvbic6ICcxOyBtb2RlPWJsb2NrJywgLy8gRW5hYmxlIFhTUyBmaWx0ZXJpbmdcclxuICAnU3RyaWN0LVRyYW5zcG9ydC1TZWN1cml0eSc6ICdtYXgtYWdlPTMxNTM2MDAwOyBpbmNsdWRlU3ViRG9tYWluczsgcHJlbG9hZCcsIC8vIEVuZm9yY2UgSFRUUFNcclxuICAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knOiBbXHJcbiAgICBcImRlZmF1bHQtc3JjICdzZWxmJ1wiLFxyXG4gICAgXCJzY3JpcHQtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgJ3Vuc2FmZS1ldmFsJ1wiLCAvLyBSZXF1aXJlZCBmb3IgUmVhY3QgYW5kIFZpdGUgZGV2XHJcbiAgICBcInN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnXCIsIC8vIFJlcXVpcmVkIGZvciBpbmxpbmUgc3R5bGVzXHJcbiAgICBcImltZy1zcmMgJ3NlbGYnIGRhdGE6IGh0dHBzOlwiLFxyXG4gICAgXCJmb250LXNyYyAnc2VsZicgZGF0YTpcIixcclxuICAgIFwiY29ubmVjdC1zcmMgJ3NlbGYnIGh0dHBzOiB3c3M6XCIsXHJcbiAgICBcImZyYW1lLWFuY2VzdG9ycyAnbm9uZSdcIixcclxuICAgIFwiYmFzZS11cmkgJ3NlbGYnXCIsXHJcbiAgICBcIm9iamVjdC1zcmMgJ25vbmUnXCJcclxuICBdLmpvaW4oJzsgJylcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBpc0RldiA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XHJcbiAgXHJcbiAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IFwiOjpcIixcclxuICAgICAgcG9ydDogODA4MCxcclxuICAgICAgLi4uKGlzRGV2ID8geyBodHRwczoge30gfSA6IHt9KSxcclxuICAgICAgaGVhZGVyczogaXNEZXYgPyBzZWN1cml0eUhlYWRlcnMgOiB7fVxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgaGVhZGVyczogc2VjdXJpdHlIZWFkZXJzIC8vIEZvciBwcm9kdWN0aW9uIHByZXZpZXdcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBzb3VyY2VtYXA6IGlzRGV2LFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgcmVhY3Q6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICAgICAgICAgIHZlbmRvcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICByZWFjdCgpLFxyXG4gICAgICBpc0RldiAmJiBiYXNpY1NzbCgpLCAvLyBFbmFibGUgc2VsZi1zaWduZWQgY2VydCBpbiBkZXZlbG9wbWVudFxyXG4gICAgICBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmIGNvbXBvbmVudFRhZ2dlcigpXHJcbiAgICBdLmZpbHRlcihCb29sZWFuKSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9O1xyXG4gIFxyXG4gIHJldHVybiBjb25maWc7XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFWLFNBQVMsb0JBQW9CO0FBQ2xYLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxjQUFjO0FBSnJCLElBQU0sbUNBQW1DO0FBT3pDLElBQU0sa0JBQWtCO0FBQUEsRUFDdEIsbUJBQW1CO0FBQUE7QUFBQSxFQUNuQiwwQkFBMEI7QUFBQTtBQUFBLEVBQzFCLG1CQUFtQjtBQUFBO0FBQUEsRUFDbkIsc0JBQXNCO0FBQUE7QUFBQSxFQUN0QixvQkFBb0I7QUFBQTtBQUFBLEVBQ3BCLDZCQUE2QjtBQUFBO0FBQUEsRUFDN0IsMkJBQTJCO0FBQUEsSUFDekI7QUFBQSxJQUNBO0FBQUE7QUFBQSxJQUNBO0FBQUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLEVBQUUsS0FBSyxJQUFJO0FBQ2I7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLFFBQVEsU0FBUztBQUV2QixRQUFNLFNBQVM7QUFBQSxJQUNiLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLEdBQUksUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQztBQUFBLE1BQzdCLFNBQVMsUUFBUSxrQkFBa0IsQ0FBQztBQUFBLElBQ3RDO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUE7QUFBQSxJQUNYO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixjQUFjO0FBQUEsWUFDWixPQUFPLENBQUMsU0FBUyxXQUFXO0FBQUEsWUFDNUIsUUFBUSxDQUFDLGtCQUFrQjtBQUFBLFVBQzdCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLFNBQVM7QUFBQTtBQUFBLE1BQ2xCLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzVDLEVBQUUsT0FBTyxPQUFPO0FBQUEsSUFDaEIsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
