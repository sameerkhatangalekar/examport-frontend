import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateCategoriesComponent } from './pages/admin/update-categories/update-categories.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { StudentGuard } from './services/student.guard';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: '',
        component: WelcomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
        pathMatch: 'full',
      },
      {
        path: 'add-category',
        component: AddCategoriesComponent,
        pathMatch: 'full',
      },
      {
        path: 'category/:catId',
        component: UpdateCategoriesComponent,
        pathMatch: 'full',
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
        pathMatch: 'full',
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
        pathMatch: 'full',
      },
      {
        path: 'update-quiz/:qid',
        component: UpdateQuizComponent,
        pathMatch: 'full',
      },
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent,
        pathMatch: 'full',
      },
      {
        path: 'add-questions/:qid/:title',
        component: AddQuestionsComponent,
        pathMatch: 'full',
      },
      {
        path: 'update-question/:questionId',
        component: UpdateQuestionComponent,
        pathMatch: 'full',
      },

    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [StudentGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
