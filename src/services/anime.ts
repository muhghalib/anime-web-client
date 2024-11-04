export class AnimeService {
  anime: Omit<Anime, 'eps'> | undefined;

  constructor(props: Omit<Anime, 'eps'> | undefined) {
    this.anime = props;
  }
}
