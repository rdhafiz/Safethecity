import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/game-portal/auth/login.component";
import {HomeComponent} from "./modules/game-portal/home/home.component";
import {GameComponent} from "./modules/game-portal/game/game.component";

export const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
];
