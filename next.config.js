/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    // Vercel 이미지 최적화 한도를 넘겨(402) 사진이 전부 깨지던 것을 막는다.
    // 끄면 public 의 원본을 그대로 내보낸다 — 리사이즈·WebP 변환이 없으므로
    // 원본 자체를 가볍게 유지해야 한다.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
}

module.exports = nextConfig
