/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint এরর ইগনোর করবে
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type checking এরর ইগনোর করবে (সবচেয়ে জরুরি)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
