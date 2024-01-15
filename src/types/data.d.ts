interface Anime {
  gambar: string;
  judul: string;
  slug: string;
  nama: string;
  namaJapan: string;
  skor: string;
  produser: string;
  tipe: string;
  status: string;
  totalEpisode: string;
  durasi: string;
  rilis: string;
  studio: string;
  genre: string;
  episodes: Pick<AnimeEpisode, 'judul' | 'slug' | 'tanggal'>[];
  batch: AnimeBatch;
  lengkap: Complete;
  eps: string[];
}

interface AnimeEpisode {
  judul: string;
  slug: string;
  tanggal: string;
  iframe: string;
  mirror: Mirror;
  download: Download;
}

interface AnimeBatch {
  judul: string;
  slug: string;
  tanggal: string;
}

interface Complete {
  judul: string;
  slug: string;
  tanggal: string;
}

interface AnimeGenre {
  judul: string;
  slug: string;
}

type MirrorType = 'm360p' | 'm480p' | 'm720p';

type MirrorContent = {
  nama: string;
  content: string;
};

type Mirror = {
  [P in MirrorType]: MirrorContent[];
};

type DownloadType =
  | 'd360pmp4'
  | 'd480pmp4'
  | 'd720pmp4'
  | 'd1080pmp4'
  | 'd480pmkv'
  | 'd720pmkv'
  | 'd1080pmkv';

type DownloadContent = {
  nama: string;
  href: string;
};

type Download = {
  [P in DownloadType]: DownloadContent[];
};

type Schedule = {
  hari: string;
  anime: Pick<Anime, 'judul' | 'slug'>[];
};
