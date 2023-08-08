interface Country {
  capital: string[];
  name: {common: string};
  population: number;
  area: number;
  languages: Record<string, string>;
  timezones: string[];
  currencies: Record<string, {name: string; symbol: string}>;
  flags: {svg: string};
}
