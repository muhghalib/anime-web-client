export class AnimeService {
  anime: Omit<Anime, 'eps'> | undefined;

  constructor(props: Omit<Anime, 'eps'> | undefined) {
    this.anime = props;
  }

  getGenres() {
    if (!this.anime || this.anime.genre == '') return [];

    return this.anime.genre
      .split(':')[1]
      .trim()
      .toLowerCase()
      .split(',')
      .map((v) => v.trim());
  }

  getInfo() {
    if (!this.anime) return [];

    const { nama, skor, produser, tipe, status, rilis, totalEpisode } = this.anime;

    return [nama, skor, rilis, totalEpisode, status, tipe, produser];
  }

  getEpisodes() {
    if (!this.anime) return [];

    const episodes = this.anime.episodes;

    let result: typeof this.anime.episodes = [];

    for (let i = 0; i < episodes.length; i++) {
      result[i] = {
        judul: `Episode ${episodes[i].judul.match(/Episode\s*(\d+)/i)?.at(1)}`,
        slug: episodes[i].slug,
        tanggal: episodes[i].tanggal,
      };
    }

    return result.reverse();
  }
}
