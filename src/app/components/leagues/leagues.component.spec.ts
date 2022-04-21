import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { LeagueService } from '../../services/league.service';

import { LeaguesComponent } from './leagues.component';

describe('LeaguesComponent', () => {
    let component: LeaguesComponent;
    let fixture: ComponentFixture<LeaguesComponent>;

    const seasons = [2008, 2009];
    const leagueService = jasmine.createSpyObj('LeagueService', ['getSeasons', 'getLeagues']);
    const getSeasonsSpy = leagueService.getSeasons.and.returnValue(of({response: seasons}));

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LeaguesComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: LeagueService, useValue: leagueService},
                {provide: ActivatedRoute, useValue: {queryParamMap: of(new Map())}}
            ]
        });

        TestBed.compileComponents();

        fixture = TestBed.createComponent(LeaguesComponent);
        component = fixture.componentInstance;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not have selected any season', () => {
        expect(component.selectedSeason).toBeFalsy();
        expect(component.seasons).toBeFalsy();
    });

    it('should have initiated season loading', fakeAsync(() => {
        fixture.detectChanges(); // onInit

        tick(); // async calls

        expect(getSeasonsSpy.calls.any())
            .withContext('getSeasons called')
            .toBeTrue();

        expect(component.seasons.length)
            .withContext('seasons loaded')
            .toBe(seasons.length);

        expect(fixture.nativeElement.querySelector('#container'))
            .withContext('#container element should be available')
            .toBeTruthy();

        const seasonButtonContainer = fixture.nativeElement.querySelector('.app-leagues__seasons');
        expect(seasonButtonContainer)
            .withContext('season button container element should be available')
            .toBeTruthy();

        fixture.detectChanges();

        expect(seasonButtonContainer.querySelectorAll('.app-leagues__season-button').length)
            .withContext('season buttons created')
            .toBe(seasons.length);
    }));

});
