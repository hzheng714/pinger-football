import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { League } from '../../models/league';
import { TeamItem } from '../../models/team';
import { LeagueService } from '../../services/league.service';
import { TeamService } from '../../services/team.service';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {

    loadingPage: boolean;
    teamVenues: TeamItem[];
    private league: League;
    private season: number;

    constructor(private route: ActivatedRoute,
                private leagueService: LeagueService,
                private teamService: TeamService) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.season = Number(params.get('season'));
            const leagueId = Number(params.get('league'));
            this.loadPage(leagueId);
        });
    }

    loadPage(leagueId: number) {
        this.loadingPage = true;
        forkJoin([
            this.leagueService.getLeagues({id: leagueId}),
            this.teamService.getTeams({season: this.season, league: leagueId})
        ]).pipe(finalize(() => {
            this.loadingPage = false;
        })).subscribe(([leagueResponse, teamResponse]) => {
            this.league = leagueResponse.response[0].league;
            this.teamVenues = teamResponse.response;
        });
    }

}
