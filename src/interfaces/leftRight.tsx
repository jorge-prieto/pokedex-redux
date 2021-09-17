export interface Properties {
  id: number;
  name: string;
  desc: string;
  height: number;
  weight: number;
  gender: number;
  abilities: abilities[];
  types: types[];
  stats: stats[];
  values: string[];
}

interface abilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot?: number;
}

interface types {
  slot?: number;
  type: {
    name: string;
    url: string;
  };
}

interface stats {
  base_stat: number;
  effort?: number;
  stat: {
    name: string;
    url: string;
  }
}