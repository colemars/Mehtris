import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ScoreComponent } from './score/score.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'game',
    component: CanvasComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
