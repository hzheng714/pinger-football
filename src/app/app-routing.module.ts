import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';
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
