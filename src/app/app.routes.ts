import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/game-portal/auth/login.component";
import {HomeComponent} from "./modules/game-portal/home/home.component";
import {GameComponent} from "./modules/game-portal/game/game.component";
import {LayoutComponent} from "./modules/game-portal/layout/layout.component";
import {StagesComponent} from "./modules/game-portal/game-statistics/stages.component";
import {CongratulationComponent} from "./modules/game-portal/congratulation/congratulation.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
  },
  {
    path: 'portal',
    component:LayoutComponent,
    children:[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'stages',
        component: StagesComponent
      },
      {
        path: 'stages/:stage',
        component: GameComponent
      },
      {
        path: 'congratulation',
        component: CongratulationComponent
      },
    ]
  },

];
