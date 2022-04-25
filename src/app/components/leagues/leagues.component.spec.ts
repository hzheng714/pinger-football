import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { click } from '../../../testing';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { asyncData } from '../../../testing/async-observable-helpers';
import { QueryParamsDirectiveStub } from '../../../testing/query-params-directive-stub';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';
import { LeagueService } from '../../services/league.service';

import { LeaguesComponent } from './leagues.component';

describe('LeaguesComponent', () => {
    let component: LeaguesComponent;
    let fixture: ComponentFixture<LeaguesComponent>;

    const seasons = [2008, 2009];
    const leagues = [
        {league: {id: 1, name: 'a'}},
        {league: {id: 2, name: 'b'}},
        {league: {id: 3, name: 'c'}}
    ];
    const leagueService = jasmine.createSpyObj('LeagueService', ['getSeasons', 'getLeagues']);
    const getSeasonsSpy = leagueService.getSeasons.and.returnValue(of({response: seasons}));
    const getLeaguesSpy = leagueService.getLeagues.and.returnValue(asyncData({response: leagues}));

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const activatedRouteStub = new ActivatedRouteStub({});

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                RouterLinkDirectiveStub,
                QueryParamsDirectiveStub,
                LeaguesComponent
            ],
            providers: [
                {provide: LeagueService, useValue: leagueService},
                {provide: Router, useValue: routerSpy},
                {provide: ActivatedRoute, useValue: activatedRouteStub}
            ],
            schemas: [NO_ERRORS_SCHEMA]
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

    it('should load leagues by season', fakeAsync(() => {
        fixture.detectChanges(); // onInit
        tick(); // async calls

        fixture.detectChanges();
        const seasonButtonDebugEls = fixture.debugElement.queryAll(By.css('.app-leagues__season-button'));
        expect(seasonButtonDebugEls[0].nativeElement.textContent.trim())
            .withContext('text of first season button is correctly reflected')
            .toEqual(seasons[0].toString());

        click(seasonButtonDebugEls[0]);
        expect(component.selectedSeason).toBe(seasons[0]);
        expect(routerSpy.navigate.calls.any())
            .withContext('router method to be called for updating url')
            .toBeTrue();
        expect(component.loadingSeason).toBeTrue();

        tick();

        expect(component.loadingSeason).toBeFalse();
        expect(component.leagues.length)
            .withContext('leagues variable set correctly')
            .toBe(leagues.length);

        fixture.detectChanges();
        const leagueCardDebugEls = fixture.debugElement.queryAll(By.css('.app-leagues__card'));
        expect(leagueCardDebugEls.length)
            .withContext('the number of league cards matches')
            .toEqual(leagues.length);
    }));

});
