export interface data2 {
  flavor_text_entries: flavor[];
  gender_rate: number;
}

interface flavor {
  flavor_text: string;
  language?: language[];
}

interface language {
  id: number;
  name?: string;
  official?: boolean;
  iso639?: string;
  iso3166?: string;
}

export interface stats {
  stats: property[];
}

interface property {
  id: number;
  name: string;
  game_index?: number;
  is_battle_only?: boolean;
}
