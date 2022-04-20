import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'leagues',
        pathMatch: 'full'
    }, {
        path: 'leagues',
        component: LeaguesComponent
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
