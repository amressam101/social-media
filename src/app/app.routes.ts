import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';
import { noAuthGuard } from './core/guards/no-auth/no-auth-guard';



export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
        path: "", loadComponent: () => import("./core/layouts/auth-layout/auth-layout.component").then(c => c.AuthLayoutComponent), canActivate: [noAuthGuard], children: [
            { path: "login", loadComponent: () => import("./core/auth/login/login.component").then(c => c.LoginComponent), title: "Sing in | Route Posts" },
            { path: "register", loadComponent: () => import("./core/auth/register/register.component").then(c => c.RegisterComponent), title: "Create Account | Route Posts " }
        ]
    },
    {
        path: "", loadComponent: () => import("./core/layouts/blank-layout/blank-layout.component").then(c => c.BlankLayoutComponent), canActivate: [authGuard], children: [
            {
                path: "home", loadComponent: () => import("./features/home/home.component").then(c => c.HomeComponent), title: "Home Feed | Route Posts", children: [
                    { path: "", redirectTo: "feed", pathMatch: "full" },
                    { path: "feed", loadComponent: () => import("./shared/components/feed-post/feed-post.component").then(c => c.FeedPostComponent) },
                    { path: "community", loadComponent: () => import("./shared/components/community/community.component").then(c => c.CommunityComponent) },
                    { path: "my-posts", loadComponent: () => import("./shared/components/my-posts/my-posts.component").then(c => c.MyPostsComponent) },
                    { path: "saved", loadComponent: () => import("./shared/components/saved-posts/saved-posts.component").then(c => c.SavedPostsComponent) },
                ]
            },
            { path: "profile", loadComponent: () => import("./features/profile/profile.component").then(c => c.ProfileComponent) },
            { path: "notifications", loadComponent: () => import("./features/notifications/notifications.component").then(c => c.NotificationsComponent), title: "Notifications | Route Posts" },
            { path: "settings", loadComponent: () => import("./features/settings/settings.component").then(c => c.SettingsComponent), title: "Change Password | Route Posts" },
            { path: "post-details/:id", loadComponent: () => import("./features/post-details/post-details.component").then(c => c.PostDetailsComponent), },
            { path: "all-suggested-friends", loadComponent: () => import("./features/all-suggested-friends/all-suggested-friends.component").then(c => c.AllSuggestedFriendsComponent), title: "Suggested Friends | Route Posts" },

        ]
    },

    { path: "**", loadComponent: () => import("./features/not-found/not-found.component").then(c => c.NotFoundComponent), title: "Not Found | Route Posts" }
];


//  title: `user profile | Route Posts`