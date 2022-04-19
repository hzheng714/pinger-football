import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { TeamItem } from '../models/team';

export interface TeamQuery {
    season: number;
    league: number;
}

@Injectable({providedIn: 'root'})
export class TeamService {

    constructor(private http: HttpClient) {
    }

    getTeams(params: Partial<TeamQuery>) {
        const url = environment.apiPrefix + '/teams';
        return this.http.get<ApiResponse<TeamItem>>(url, {params});
    }

}
