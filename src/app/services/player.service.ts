import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { PlayerItem } from '../models/player';

export interface PlayerQuery {
    id: number;
    team: number;
    league: number;
    season: number;
}

@Injectable({providedIn: 'root'})
export class PlayerService {

    constructor(private http: HttpClient) {
    }

    getPlayers(query: Partial<PlayerQuery>) {
        const url = environment.apiPrefix + '/players';
        return this.http.get<ApiResponse<PlayerItem>>(url, {params: query});
    }

}
