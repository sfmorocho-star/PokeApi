// Interfaz para la lista principal de Pokémones
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
}

// Interfaz para las estadísticas
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// Interfaz para los tipos (fuego, agua, etc.)
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Interfaz completa para el detalle del Pokémon
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
}