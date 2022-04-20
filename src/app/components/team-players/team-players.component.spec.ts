import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { LeagueService } from '../../services/league.service';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';

import { TeamPlayersComponent } from './team-players.component';

describe('TeamPlayersComponent', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    let component: TeamPlayersComponent;
    let fixture: ComponentFixture<TeamPlayersComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TeamPlayersComponent],
            imports: [HttpClientTestingModule, IonicModule.forRoot(), RouterTestingModule.withRoutes([])],
            providers: [PlayerService, TeamService, LeagueService, {
                provide: ActivatedRoute,
                useValue: {
                    queryParamMap: of(new Map())
                }
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(TeamPlayersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
