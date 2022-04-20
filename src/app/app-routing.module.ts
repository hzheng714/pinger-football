import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { TeamPlayersComponent } from './components/team-players/team-players.component';
import { TeamsComponent } from './components/teams/teams.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'leagues',
        pathMatch: 'full'
    }, {
        path: 'leagues',
        component: LeaguesComponent
    }, {
        path: 'teams',
        component: TeamsComponent
    }, {
        path: 'team-players',
        component: TeamPlayersComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
