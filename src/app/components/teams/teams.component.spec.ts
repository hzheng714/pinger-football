import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { LeagueService } from '../../services/league.service';
import { TeamService } from '../../services/team.service';

import { TeamsComponent } from './teams.component';

describe('TeamsComponent', () => {
    let component: TeamsComponent;
    let fixture: ComponentFixture<TeamsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TeamsComponent],
            imports: [HttpClientTestingModule, IonicModule.forRoot(), RouterTestingModule.withRoutes([])],
            providers: [TeamService, LeagueService, {
                provide: ActivatedRoute,
                useValue: {
                    queryParamMap: of(new Map())
                }
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(TeamsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
