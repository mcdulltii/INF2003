import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import HomeLayout from "@/layout/home/HomeLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// App pages
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue"
import IndivPost from "@/pages/Posts/IndivPostCard.vue";
import CreatePost from "@/pages/CreatePost.vue";
import EditPost from "@/pages/EditPost.vue";
import Subbludit from "@/pages/Posts/Subreddit.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserPage.vue";
import UserSettings from "@/pages/UserProfile.vue";
import PostsAdmin from '@/pages/MongoAdmin/PostsAdmin.vue'
import CommentsAdmin from '@/pages/MongoAdmin/CommentsAdmin.vue'

const routes = [
  {
    path: "/",
    component: HomeLayout,
    redirect: "/",
    hidden: true,
    children: [
      {
        path: "/",
        name: "home", 
        component: Home,
      },
      {
        path: "/createpost",
        name: "createpost", 
        component: CreatePost,
      },
      {
        path: "/subbludit/:sub",
        name: "subbludit", 
        component: Subbludit,
      },
      {
        path: "/userprofile",
        name: "userprofile", 
        component: UserProfile,
      },
      {
        path: "/usersettings",
        name: "usersettings", 
        component: UserSettings,
      },
    ]
  },
  {
    path: '/indivpost',
    component: () => import('@/layout/post/PostLayout.vue'),
    hidden: true,
    children: [
      {
        path: "/indivpost/:id",
        name: "indivpost", 
        component: IndivPost,
      },
      {
        path: "/indivpost/edit/:id",
        name: "indivpostedit", 
        component: EditPost,
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/layout/login/LoginLayout.vue'),
    hidden: true,
    children: [
      {
        path: "/login",
        name: "login", 
        component: Login,
      },
      {
        path: "/register",
        name: "register", 
        component: Register,
      }
    ]
  },
  {
    path: "/admin",
    component: DashboardLayout,
    children: [
      {
        path: "/admin",
        name: "posts-admin",
        component: PostsAdmin,
      },
      {
        path: "/stats",
        name: "stats",
        component: UserProfile,
      },
      {
        path: "/posts-admin",
        name: "posts-admin",
        component: PostsAdmin,
      },
      {
        path: "/comments-admin",
        name: "comments-admin",
        component: CommentsAdmin,
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
