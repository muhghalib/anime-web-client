interface Anime {
  title: string;
  image: string;
  slug: string;
  rating: string;
  type: string;
  description: string;
  genre: Genre[];
  duration: string;
  season: Slug;
  producers: Producer[];
  synopsis: string;
  status: string;
  source: string;
  total_episode: string;
  studio: Slug;
  released: string;
  trailer: string;
  episode: Episode[];
}

interface AnimeBatch {
  title: string;
  slug: string;
  tanggal: string;
}

interface Complete {
  title: string;
  slug: string;
  tanggal: string;
}

interface Producer {
  title: string;
  slug: string;
}

interface Episode {
  title: string;
  date: string;
  slug: string;
  iframe: Iframe[];
  previousStreaming: string;
  nextStreaming: string;
  downloads: Download;
}

interface Genre {
  title: string;
  slug: string;
}

interface Iframe {
  title: string;
  post: string;
  nume: string;
  type: string;
}

type DownloadType = 'mkv' | 'mp4' | 'x265';

type DownloadLink = {
  title: string;
  link: string;
};
type Download = {
  [P in DownloadType]: {
    d360p: DownloadLink[];
    d480p: DownloadLink[];
    d720p: DownloadLink[];
    d1080p: DownloadLink[];
  };
};

type Schedule = {
  hari: string;
  anime: Pick<Anime, 'judul' | 'slug'>[];
};
