import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LeagueItem } from '../../models/league';
import { LeagueService } from '../../services/league.service';

@Component({
    selector: 'app-leagues',
    templateUrl: './leagues.component.html',
    styleUrls: ['./leagues.component.scss'],
})
export class LeaguesComponent implements OnInit {

    loadingPage: boolean;
    loadingSeason: boolean;
    selectedSeason: number;
    seasons: number[];
    leagues: LeagueItem[];

    constructor(private leagueService: LeagueService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            const season = Number(params.get('season'));
            if (season) {
                this.loadLeaguesBySeason(season);
            } else {
                this.selectedSeason = null;
                this.leagues = [];
            }
        });
        setTimeout(() => {
            this.loadSeasons();
        });
    }

    loadSeasons() {
        this.loadingPage = true;
        this.leagueService.getSeasons()
            .pipe(finalize(() => {
                this.loadingPage = false;
            }))
            .subscribe(response => {
                this.seasons = response.response;
            });
    }

    loadLeaguesBySeason(season: number) {
        this.selectedSeason = season;
        this.router.navigate([this.route.pathFromRoot], {queryParams: {season}});
        const observable = this.leagueService.getLeagues({season});
        if (observable) {
            this.loadingSeason = true;
            observable.pipe(finalize(() => {
                this.loadingSeason = false;
            })).subscribe(response => {
                this.leagues = response.response;
            });
        }
    }

    }
