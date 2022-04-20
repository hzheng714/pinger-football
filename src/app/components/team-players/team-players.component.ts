import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { League } from '../../models/league';
import { PlayerItem } from '../../models/player';
import { Team } from '../../models/team';
import { LeagueService } from '../../services/league.service';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';

@Component({
    selector: 'app-team-players',
    templateUrl: './team-players.component.html',
    styleUrls: ['./team-players.component.scss'],
})
export class TeamPlayersComponent implements OnInit, OnDestroy {

    loadingPage: boolean;
    playerItems: PlayerItem[];
    league: League;
    private team: Team;
    private season: number;
    private subscriptions = new Subscription();

    constructor(private leagueService: LeagueService,
                private playerService: PlayerService,
                private route: ActivatedRoute,
                private teamService: TeamService) {
    }

    ngOnInit() {
        this.subscriptions.add(this.route.queryParamMap.subscribe(params => {
            this.season = Number(params.get('season'));
            const leagueId = Number(params.get('league'));
            const teamId = Number(params.get('team'));
            this.loadPage(leagueId, teamId);
        }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    loadPage(leagueId: number, teamId: number) {
        this.loadingPage = true;
        forkJoin([
            this.leagueService.getLeagues({id: leagueId}),
            this.teamService.getTeams({id: teamId}),
            this.playerService.getPlayers({team: teamId, season: this.season, league: leagueId})
        ]).pipe(finalize(() => {
                this.loadingPage = false;
            }))
            .subscribe(([leagueResponse, teamResponse, playerResponse]) => {
                this.league = leagueResponse.response[0].league;
                this.team = teamResponse.response[0].team;
                this.playerItems = playerResponse.response;
            });
    }

}
