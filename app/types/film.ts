import { FilmCharacter } from "./filmCharacter";

export type Film = {
    id: string;
    title: string;
    original_title: string;
    description: string;
    image: string;
    director: string;
    movie_banner: string;
    people: string[];
    characters?: FilmCharacter[];
  };