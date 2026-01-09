import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// import basicSsl from '@vitejs/plugin-basic-ssl';

// Security headers configuration
const securityHeaders = {
  'X-Frame-Options': 'DENY', // Prevent clickjacking
  'X-Content-Type-Options': 'nosniff', // Prevent MIME type sniffing
  'Referrer-Policy': 'strict-origin-when-cross-origin', // Control referrer information
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()', // Disable unused APIs
  'X-XSS-Protection': '1; mode=block', // Enable XSS filtering
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload', // Enforce HTTPS
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for React and Vite dev
    "style-src 'self' 'unsafe-inline'", // Required for inline styles
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'"
  ].join('; ')
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  const config = {
    server: {
      host: true,
      port: 8080,
    },
    preview: {
      headers: securityHeaders // For production preview
    },
    build: {
      sourcemap: isDev,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['react-router-dom'],
          },
        },
      },
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    }
  };

  return config;
});
