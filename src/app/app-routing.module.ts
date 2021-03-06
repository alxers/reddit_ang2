import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
// import { PageNotFoundComponent } from './not-found.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      
    ]
  },
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
