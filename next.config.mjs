/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // three.js / R3F / drei ship as ESM-only packages in node_modules; letting
  // Next transpile them through its own SWC pipeline (instead of treating
  // them as pre-built) avoids ESM/CJS interop bugs in the bundled output.
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
