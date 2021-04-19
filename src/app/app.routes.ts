import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'statics', component: StatisticsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];