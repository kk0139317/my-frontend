/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
    async rewrites() {
      return [
        {
          source: '/detect',
          destination: 'http://localhost:8000/detect',
        },
      ];
    },
  };
  