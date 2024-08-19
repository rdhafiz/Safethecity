import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/game-portal/auth/login.component";
import {HomeComponent} from "./modules/game-portal/home/home.component";
import {GameComponent} from "./modules/game-portal/game/game.component";
import {LayoutComponent} from "./modules/game-portal/layout/layout.component";

export const routes: Routes = [
  {
    path: 'portal',
    component:LayoutComponent,
    children:[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'game',
        component: GameComponent
      },
    ]
  },
  {
    path:'',
    component: LoginComponent,
  },

];
