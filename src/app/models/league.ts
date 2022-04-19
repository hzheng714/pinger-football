import { Country } from './country';
import { Season } from './season';

export interface League {
    id: number;
    logo: string;
    name: string;
    type: string;
}

export interface LeagueItem {
    country: Country;
    league: League;
    seasons: Season[];
}
