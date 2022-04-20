import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { LeagueService } from '../../services/league.service';

import { LeaguesComponent } from './leagues.component';

describe('LeaguesComponent', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    let component: LeaguesComponent;
    let fixture: ComponentFixture<LeaguesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LeaguesComponent],
            imports: [HttpClientTestingModule,
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([])],
            providers: [LeagueService, {
                provide: ActivatedRoute,
                useValue: {
                    queryParamMap: of(new Map())
                }
            }]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        TestBed.compileComponents();

        fixture = TestBed.createComponent(LeaguesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
