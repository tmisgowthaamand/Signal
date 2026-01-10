// vite.config.ts
import { defineConfig } from "file:///C:/Users/Admin/OneDrive/Desktop/New%20folder/signal/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Admin/OneDrive/Desktop/New%20folder/signal/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/Admin/OneDrive/Desktop/New%20folder/signal/node_modules/lovable-tagger/dist/index.js";
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
      host: true,
      port: 8080
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
            "react-vendor": ["react", "react-dom"],
            "router-vendor": ["react-router-dom"],
            "animation-vendor": ["framer-motion"],
            "ui-vendor": ["lucide-react", "@radix-ui/react-slot", "class-variance-authority", "tailwind-merge"]
          }
        }
      },
      chunkSizeWarningLimit: 1e3
    },
    plugins: [
      react(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE5ldyBmb2xkZXJcXFxcc2lnbmFsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE5ldyBmb2xkZXJcXFxcc2lnbmFsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BZG1pbi9PbmVEcml2ZS9EZXNrdG9wL05ldyUyMGZvbGRlci9zaWduYWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcclxuLy8gaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCc7XHJcblxyXG4vLyBTZWN1cml0eSBoZWFkZXJzIGNvbmZpZ3VyYXRpb25cclxuY29uc3Qgc2VjdXJpdHlIZWFkZXJzID0ge1xyXG4gICdYLUZyYW1lLU9wdGlvbnMnOiAnREVOWScsIC8vIFByZXZlbnQgY2xpY2tqYWNraW5nXHJcbiAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsIC8vIFByZXZlbnQgTUlNRSB0eXBlIHNuaWZmaW5nXHJcbiAgJ1JlZmVycmVyLVBvbGljeSc6ICdzdHJpY3Qtb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luJywgLy8gQ29udHJvbCByZWZlcnJlciBpbmZvcm1hdGlvblxyXG4gICdQZXJtaXNzaW9ucy1Qb2xpY3knOiAnY2FtZXJhPSgpLCBtaWNyb3Bob25lPSgpLCBnZW9sb2NhdGlvbj0oKSwgcGF5bWVudD0oKScsIC8vIERpc2FibGUgdW51c2VkIEFQSXNcclxuICAnWC1YU1MtUHJvdGVjdGlvbic6ICcxOyBtb2RlPWJsb2NrJywgLy8gRW5hYmxlIFhTUyBmaWx0ZXJpbmdcclxuICAnU3RyaWN0LVRyYW5zcG9ydC1TZWN1cml0eSc6ICdtYXgtYWdlPTMxNTM2MDAwOyBpbmNsdWRlU3ViRG9tYWluczsgcHJlbG9hZCcsIC8vIEVuZm9yY2UgSFRUUFNcclxuICAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knOiBbXHJcbiAgICBcImRlZmF1bHQtc3JjICdzZWxmJ1wiLFxyXG4gICAgXCJzY3JpcHQtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgJ3Vuc2FmZS1ldmFsJ1wiLCAvLyBSZXF1aXJlZCBmb3IgUmVhY3QgYW5kIFZpdGUgZGV2XHJcbiAgICBcInN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnXCIsIC8vIFJlcXVpcmVkIGZvciBpbmxpbmUgc3R5bGVzXHJcbiAgICBcImltZy1zcmMgJ3NlbGYnIGRhdGE6IGh0dHBzOlwiLFxyXG4gICAgXCJmb250LXNyYyAnc2VsZicgZGF0YTpcIixcclxuICAgIFwiY29ubmVjdC1zcmMgJ3NlbGYnIGh0dHBzOiB3c3M6XCIsXHJcbiAgICBcImZyYW1lLWFuY2VzdG9ycyAnbm9uZSdcIixcclxuICAgIFwiYmFzZS11cmkgJ3NlbGYnXCIsXHJcbiAgICBcIm9iamVjdC1zcmMgJ25vbmUnXCJcclxuICBdLmpvaW4oJzsgJylcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBpc0RldiA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XHJcblxyXG4gIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiB0cnVlLFxyXG4gICAgICBwb3J0OiA4MDgwLFxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgaGVhZGVyczogc2VjdXJpdHlIZWFkZXJzIC8vIEZvciBwcm9kdWN0aW9uIHByZXZpZXdcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBzb3VyY2VtYXA6IGlzRGV2LFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgJ3JlYWN0LXZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICAgICAgICAgICdyb3V0ZXItdmVuZG9yJzogWydyZWFjdC1yb3V0ZXItZG9tJ10sXHJcbiAgICAgICAgICAgICdhbmltYXRpb24tdmVuZG9yJzogWydmcmFtZXItbW90aW9uJ10sXHJcbiAgICAgICAgICAgICd1aS12ZW5kb3InOiBbJ2x1Y2lkZS1yZWFjdCcsICdAcmFkaXgtdWkvcmVhY3Qtc2xvdCcsICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknLCAndGFpbHdpbmQtbWVyZ2UnXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgcmVhY3QoKSxcclxuICAgICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJiBjb21wb25lbnRUYWdnZXIoKVxyXG4gICAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGNvbmZpZztcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVYsU0FBUyxvQkFBb0I7QUFDbFgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUhoQyxJQUFNLG1DQUFtQztBQU96QyxJQUFNLGtCQUFrQjtBQUFBLEVBQ3RCLG1CQUFtQjtBQUFBO0FBQUEsRUFDbkIsMEJBQTBCO0FBQUE7QUFBQSxFQUMxQixtQkFBbUI7QUFBQTtBQUFBLEVBQ25CLHNCQUFzQjtBQUFBO0FBQUEsRUFDdEIsb0JBQW9CO0FBQUE7QUFBQSxFQUNwQiw2QkFBNkI7QUFBQTtBQUFBLEVBQzdCLDJCQUEyQjtBQUFBLElBQ3pCO0FBQUEsSUFDQTtBQUFBO0FBQUEsSUFDQTtBQUFBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixFQUFFLEtBQUssSUFBSTtBQUNiO0FBR0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxRQUFRLFNBQVM7QUFFdkIsUUFBTSxTQUFTO0FBQUEsSUFDYixRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBO0FBQUEsSUFDWDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sY0FBYztBQUFBLFlBQ1osZ0JBQWdCLENBQUMsU0FBUyxXQUFXO0FBQUEsWUFDckMsaUJBQWlCLENBQUMsa0JBQWtCO0FBQUEsWUFDcEMsb0JBQW9CLENBQUMsZUFBZTtBQUFBLFlBQ3BDLGFBQWEsQ0FBQyxnQkFBZ0Isd0JBQXdCLDRCQUE0QixnQkFBZ0I7QUFBQSxVQUNwRztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUEsSUFDNUMsRUFBRSxPQUFPLE9BQU87QUFBQSxJQUNoQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
