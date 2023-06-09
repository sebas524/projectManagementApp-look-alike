import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';

const routes: Routes = [
  {
    path: '',
    // component: AuthLayoutPageComponent,
    children: [
      {
        path: 'boards',
        component: BoardsComponent,
      },
      // {
      //   path: 'register',
      //   component: RegisterPageComponent,
      // },
      {
        path: '**',
        redirectTo: 'boards',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {}
