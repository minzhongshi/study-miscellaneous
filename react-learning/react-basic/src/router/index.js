import Layout from '@/page/Layout' // src/pages/layout
import Login from '@/page/Login'

import {createBrowserRouter} from "react-router-dom";
import { AuthRoute } from '@/components/AuthRoute'
import React from "react";
import { Suspense, lazy } from 'react'
import NotFound from "../page/NotFound";

// 1. lazy函数对组件进行导入
const Home = lazy(() => import('@/page/Home'))
const Article = lazy(() => import('@/page/Article'))
const Publish = lazy(() => import('@/page/Publish'))


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute> <Layout /></AuthRoute>,
        children: [
            {
                index: true,
                element: <Suspense fallback={'加载中'}><Home /></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}><Article /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}><Publish /></Suspense>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;