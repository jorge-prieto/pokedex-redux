export interface pokemons {
  count: number;
  next: string;
  previous: boolean;
  results: result[];
}

interface result {
  name: string;
  url: string;
}
