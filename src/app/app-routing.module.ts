import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./layouts/default/default.component";
import { LoginComponent } from "./modules/login/login.component";
import { ChoosingClassroomComponent } from "./modules/choosing-classroom/choosing-classroom.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { PostsComponent } from "./modules/posts/posts.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "classroom", component: ChoosingClassroomComponent },
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "posts",
        component: PostsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
