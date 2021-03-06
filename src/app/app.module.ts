import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { TeamPlayersComponent } from './components/team-players/team-players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { AppHttpInterceptor } from './services/app-http-interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LeaguesComponent,
        TeamPlayersComponent,
        TeamsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot({
            mode: 'md'
        }),
        AppRoutingModule
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
