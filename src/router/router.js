import {createRouter, createWebHistory} from 'vue-router'
import UserPage from "@/pages/UserPage";
import About from "@/pages/About";
import PostIdPage from "../pages/PostIdPage";
import PostPageWithStore from "../pages/PostPageWithStore";
import PostPageCompositionAPI from "../pages/PostPageCompositionAPI";

const routes = [
    {
        path: '/',
        component: UserPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionAPI
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;
