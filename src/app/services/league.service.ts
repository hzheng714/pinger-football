import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { LeagueItem } from '../models/league';

@Injectable({providedIn: 'root'})
export class LeagueService {

    constructor(private http: HttpClient) {
    }

    getSeasons() {
        const url = environment.apiPrefix + '/leagues/seasons';
        return this.http.get<ApiResponse<number>>(url);
    }

    getLeaguesBySeason(season: number) {
        const url = environment.apiPrefix + '/leagues';
        return this.http.get<ApiResponse<LeagueItem>>(url, {params: {season}});
    }

}
