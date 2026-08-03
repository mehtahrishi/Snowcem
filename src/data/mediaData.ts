export interface MediaVideo {
  id: string;
  title: string;
  language: string;
  youtubeId: string;
  youtubeUrl: string;
  description: string;
  tag: string;
}

export const MEDIA_VIDEOS: MediaVideo[] = [
  {
    id: "video-hindi",
    title: "Snowcem Paints Commercial - Hindi",
    language: "Hindi",
    youtubeId: "-umd2knGfUo",
    youtubeUrl: "https://youtu.be/-umd2knGfUo?si=fB6PY8HYJ3DTrhkr",
    description: "Official Snowcem Paints TV commercial in Hindi showcasing iconic exterior protection and vibrant long-lasting colors.",
    tag: "National TVC",
  },
  {
    id: "video-bengali",
    title: "Snowcem Paints Commercial - Bengali",
    language: "Bengali",
    youtubeId: "T0HJFvOZa2k",
    youtubeUrl: "https://youtu.be/T0HJFvOZa2k?si=cRuPcnx-9yjD_4jy",
    description: "Official Snowcem Paints TV commercial in Bengali celebrating long-lasting exterior protection.",
    tag: "Regional TVC",
  },
  {
    id: "video-oriya",
    title: "Snowcem Paints Commercial - Oriya",
    language: "Oriya",
    youtubeId: "N_70A0tYqhU",
    youtubeUrl: "https://youtu.be/N_70A0tYqhU?si=kAlaxGjMbc2IT7ol",
    description: "Official Snowcem Paints TV commercial in Oriya showcasing eco-friendly waterproof performance.",
    tag: "Regional TVC",
  },
  {
    id: "video-marathi",
    title: "Snowcem Paints Commercial - Marathi",
    language: "Marathi",
    youtubeId: "BLlj3VOL2ao",
    youtubeUrl: "https://youtu.be/BLlj3VOL2ao?si=i_IGi1wWDij199Z4",
    description: "Official Snowcem Paints TV commercial in Marathi bringing colors of joy and weather defense.",
    tag: "Regional TVC",
  },
  {
    id: "video-gujarati",
    title: "Snowcem Paints Commercial - Gujarati",
    language: "Gujarati",
    youtubeId: "9OX0bvKb2cw",
    youtubeUrl: "https://youtu.be/9OX0bvKb2cw?si=7Vu-iSp8mqR4G7Js",
    description: "Official Snowcem Paints TV commercial in Gujarati highlighting trusted heritage and vibrancy.",
    tag: "Regional TVC",
  },
];
