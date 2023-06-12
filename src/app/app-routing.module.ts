import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFound404Component } from './shared/pages/page-not-found404/page-not-found404.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { privateGuard } from './auth/guards/private.guard';
import { publicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [publicGuard],

    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pm',
    canActivate: [privateGuard],

    loadChildren: () =>
      import('./project-management/project-management.module').then(
        (m) => m.ProjectManagementModule
      ),
  },
  // {
  //   path: 'heroes',

  //   loadChildren: () =>
  //     import('./heroes/heroes.module').then((m) => m.HeroesModule),
  // },
  {
    path: 'home',
    canActivate: [publicGuard],

    component: HomePageComponent,
  },
  {
    path: '404',
    component: PageNotFound404Component,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
