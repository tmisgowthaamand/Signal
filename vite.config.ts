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
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Required for inline styles and Google Fonts
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com", // Required for Google Fonts
    "connect-src 'self' https: wss: https://raw.githack.com", // Required for HDR assets
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
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'animation-vendor': ['framer-motion'],
            'ui-vendor': ['lucide-react', '@radix-ui/react-slot', 'class-variance-authority', 'tailwind-merge'],
            'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          },
        },
      },
      chunkSizeWarningLimit: 2500,
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
