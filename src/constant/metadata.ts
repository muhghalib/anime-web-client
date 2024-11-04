import { config } from '@app/config';
import type { Metadata } from 'next';

export const MAIN_PAGE_METADATA: Metadata = {
  title: 'Nonton Anime Terbaik dengan Subtitle Indonesia',
  description:
    'Temukan pengalaman menonton anime terbaik di Ghanime. Saksikan ratusan title anime favorit dengan terjemahan bahasa Indonesia dan kualitas resolusi tinggi. Jelajahi berbagai genre, dapatkan update episode terbaru, dan bergabunglah dengan komunitas penggemar anime. Mulai petualangan anime Anda sekarang!',
  keywords: [
    'nonton anime',
    'anime terbaik',
    'streaming anime',
    'subtitle Indonesia',
    'kualitas resolusi tinggi',
    'update anime terbaru',
  ],
  alternates: {
    canonical: `${config.app_url}/`,
  },
  other: {
    'og:title': 'Nonton Anime Terbaik dengan Subtitle Indonesia',
    'og:description':
      'Temukan pengalaman menonton anime terbaik di Ghanime. Saksikan ratusan title anime favorit dengan terjemahan bahasa Indonesia dan kualitas resolusi tinggi. Jelajahi berbagai genre, dapatkan update episode terbaru, dan bergabunglah dengan komunitas penggemar anime. Mulai petualangan anime Anda sekarang!',
    'og:site_name': 'ghanime',
    'og:locale': 'id_ID',
  },
};

export const SCHEDULE_PAGE_METADATA: Metadata = {
  title: 'Jadwal Update Anime Terbaru dan Terlengkap',
  description:
    'Dapatkan jadwal update anime terbaru dan terlengkap di Ghanime. Saksikan keseruan episode terbaru, kisah menarik, dan peristiwa penting dalam dunia anime. Jangan lewatkan momen seru dari serial anime favorit Anda!',
  category: 'anime',
  keywords: [
    'anime',
    'ghanime',
    'nonton anime',
    'anime terbaik',
    'streaming anime',
    'subtitle Indonesia',
    'kualitas resolusi tinggi',
    'update anime terbaru',
    'jadwal update anime',
    'update anime terbaru',
    'jadwal rilis anime',
    'anime terlengkap',
    'streaming anime',
    'info anime',
    'jadwal episode anime',
  ],
  robots: {
    index: true,
  },
  alternates: {
    canonical: `${config.app_url}/schedule`,
  },
  other: {
    'og:title': 'Jadwal Update Anime Terbaru dan Terlengkap',
    'og:description':
      'Dapatkan jadwal update anime terbaru dan terlengkap di Ghanime. Saksikan keseruan episode terbaru, kisah menarik, dan peristiwa penting dalam dunia anime. Jangan lewatkan momen seru dari serial anime favorit Anda!',
    'og:site_name': 'ghanime',
    'og:locale': 'id_ID',
  },
};

export const ONGOING_ANIME_METADATA: Metadata = {
  title: 'Ongoing anime',
  description:
    'Jangan lewatkan anime terbaru yang sedang tayang! Temukan jadwal lengkap dan update terkini dari serial anime yang masih berlangsung di Ghanime. Saksikan kisah-kisah seru dan karakter-karakter yang memukau setiap minggunya.',
  category: 'anime',
  keywords: [
    'anime',
    'ghanime',
    'nonton anime',
    'anime terbaik',
    'streaming anime',
    'subtitle Indonesia',
    'kualitas resolusi tinggi',
    'update anime terbaru',
    'ongoing anime',
    'jadwal anime',
    'anime terbaru',
    'update anime',
    'streaming anime',
    'anime bahasa indonesia',
    'info anime',
    'jadwal rilis anime',
  ],
  alternates: {
    canonical: `${config.app_url}/ongoing-anime`,
  },
  robots: {
    index: true,
  },
  other: {
    'og:title': 'Ongoing anime',
    'og:description':
      'Jangan lewatkan anime terbaru yang sedang tayang! Temukan jadwal lengkap dan update terkini dari serial anime yang masih berlangsung di Ghanime. Saksikan kisah-kisah seru dan karakter-karakter yang memukau setiap minggunya.',
    'og:site_name': 'ghanime',
    'og:locale': 'id_ID',
  },
};

export const GENRE_PAGE_METADATA = ({
  genre,
  genre_slug,
}: {
  genre?: Genre['title'];
  genre_slug: string;
}): Metadata => ({
  title: `${genre || genre} anime`,
  description:
    'Jelajahi dunia anime melalui berbagai genre yang menarik di Anime Genre. Temukan anime terbaik dari genre action, romance, fantasy, dan banyak lagi. Dapatkan rekomendasi, ulasan, dan jadwal untuk setiap genre anime favorit Anda. Saksikan kisah-kisah seru dengan terjemahan bahasa Indonesia untuk pengalaman menonton yang lebih mendalam.',
  keywords: [
    'anime',
    'ghanime',
    'genre anime',
    'anime terbaik',
    'nonton anime',
    'anime terbaik',
    'streaming anime',
    'subtitle Indonesia',
    'kualitas resolusi tinggi',
    'update anime terbaru',
    'rekomendasi anime',
    'streaming anime',
    'info genre anime',
    'anime bahasa indonesia',
  ],
  robots: {
    index: true,
  },
  alternates: {
    canonical: `${config.app_url}/genre/${genre_slug}`,
  },
  category: 'anime',
  other: {
    'og:title': `${genre || genre} anime`,
    'og:description':
      'Jelajahi dunia anime melalui berbagai genre yang menarik di Anime Genre. Temukan anime terbaik dari genre action, romance, fantasy, dan banyak lagi. Dapatkan rekomendasi, ulasan, dan jadwal untuk setiap genre anime favorit Anda. Saksikan kisah-kisah seru dengan terjemahan bahasa Indonesia untuk pengalaman menonton yang lebih mendalam.',
    'og:site_name': 'ghanime',
    'og:locale': 'id_ID',
    'og:type': genre || 'genre',
  },
});

export const ANIME_PAGE_METADATA = ({
  anime,
  anime_slug,
}: {
  anime: Omit<Anime, 'eps'>;
  anime_slug: string;
}): Metadata => ({
  title: `${anime.title}`,
  description: `Temukan pengalaman menonton anime${
    anime.title.split(':')?.at(1) || ''
  } dengan Subtitle Indonesia. Saksikan setiap episode dengan terjemahan bahasa Indonesia dan resolusi penuh yang memikat. Jelajahi koleksi lengkap anime favorit, nikmati detail visual yang mengagumkan, dan rasakan keajaiban kisah-kisah unik yang hanya bisa Anda temui di sini. Nonton anime dengan resolusi lengkap sekarang untuk pengalaman menonton yang maksimal!`,
  category: 'anime',
  robots: {
    index: true,
  },
  alternates: {
    canonical: `${config.app_url}/${anime_slug}`,
  },
  keywords: [
    'anime',
    'ghanime',
    'anime terbaik',
    'nonton anime',
    'anime terbaik',
    'streaming anime',
    'subtitle Indonesia',
    'kualitas resolusi tinggi',
    'update anime terbaru',
    'rekomendasi anime',
    'streaming anime',
    'anime bahasa indonesia',
    anime.title,
  ],
  other: {
    'og:title': `${anime.title}`,
    'og:description': `Temukan pengalaman menonton anime${
      anime.title.split(':')?.at(1) || ''
    } dengan Subtitle Indonesia. Saksikan setiap episode dengan terjemahan bahasa Indonesia dan resolusi penuh yang memikat. Jelajahi koleksi lengkap anime favorit, nikmati detail visual yang mengagumkan, dan rasakan keajaiban kisah-kisah unik yang hanya bisa Anda temui di sini. Nonton anime dengan resolusi lengkap sekarang untuk pengalaman menonton yang maksimal!`,
    'og:site_name': 'ghanime',
    'og:locale': 'id_ID',
    'og:type': 'video',
  },
});

export const SEARCH_PAGE_METADATA = ({ query }: { query: string }): Metadata => ({
  title: `Cari ribuan anime terkait ${decodeURIComponent(query)} di ghanime`,
  category: 'anime',
  robots: {
    index: false,
  },
  alternates: {
    canonical: `${config.app_url}/search/${query}`,
  },
  other: {
    'og:title': `Cari ribuan anime terkait ${decodeURIComponent(query)} di ghanime`,
    'og:site_name': 'ghanime',
    'og:locale': 'id_ID',
    'og:type': 'video',
  },
});

export const ANIME_EPISODE_PAGE_METADATA = ({
  episode,
  anime_slug,
  episode_slug,
}: {
  episode: Episode;
  anime_slug: string;
  episode_slug: string;
}): Metadata => ({
  title: `${episode.title}`,
  description: `Temukan pengalaman menonton anime ${episode.title} dengan Subtitle Indonesia. Saksikan setiap episode dengan terjemahan bahasa Indonesia dan resolusi penuh yang memikat. Jelajahi koleksi lengkap anime favorit, nikmati detail visual yang mengagumkan, dan rasakan keajaiban kisah-kisah unik yang hanya bisa Anda temui di sini. Nonton anime dengan resolusi lengkap sekarang untuk pengalaman menonton yang maksimal!`,
  category: 'anime',
  keywords: [
    'anime',
    'ghanime',
    'anime terbaik',
    'rekomendasi anime',
    'nonton anime',
    'anime terbaik',
    'streaming anime',
    'subtitle Indonesia',
    'kualitas resolusi tinggi',
    'update anime terbaru',
    'streaming anime',
    'anime bahasa indonesia',
  ],
  robots: {
    index: true,
  },
  alternates: {
    canonical: `${config.app_url}/${anime_slug}/${episode_slug}`,
  },
  other: {
    'og:title': `${episode.title}`,
    'og:description': `Temukan pengalaman menonton anime ${episode.title} dengan Subtitle Indonesia. Saksikan setiap episode dengan terjemahan bahasa Indonesia dan resolusi penuh yang memikat. Jelajahi koleksi lengkap anime favorit, nikmati detail visual yang mengagumkan, dan rasakan keajaiban kisah-kisah unik yang hanya bisa Anda temui di sini. Nonton anime dengan resolusi lengkap sekarang untuk pengalaman menonton yang maksimal!`,
    'og:site_name': 'ghanime',
    'og:locale': 'id_ID',
    'og:type': 'video',
  },
});
