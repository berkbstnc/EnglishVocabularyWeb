import { Routes } from '@angular/router';
import { AddVocabularyComponent } from './add-vocabulary/add-vocabulary.component';
import { ListVocabularyComponent } from './list-vocabulary/list-vocabulary.component';
import { ShowVocabularyComponent } from './show-vocabulary/show-vocabulary.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { EditComponent } from './edit/edit.component';
import { UsersComponent } from './users/users.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

export const routes: Routes = [
    {path:'', component: WelcomeComponent, canActivate:[authGuard]},
    {path:'add', component: AddVocabularyComponent, canActivate:[authGuard], data: { roles: ['Admin'] }},
    {path:'show', component: ShowVocabularyComponent, canActivate:[authGuard]},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'welcome', component: WelcomeComponent, canActivate:[authGuard]},
    {path:'scoreboard', component: ScoreboardComponent, canActivate:[authGuard]},
    {path:'list', component: ListVocabularyComponent, canActivate:[authGuard], data: { roles: ['Admin'] }},
    {path:'edit', component: EditComponent, canActivate:[authGuard], data: { roles: ['Admin'] }},
    {path:'users', component: UsersComponent, canActivate:[authGuard], data: { roles: ['Admin'] }},
    {path:'resetpassword', component: ResetpasswordComponent},
    {path:'changepassword', component: ChangepasswordComponent}
];