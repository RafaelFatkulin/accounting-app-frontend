import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Main} from "../../pages/Main";
import {RootLayout} from "../../pages/layouts/RootLayout";
import {AuthLayout} from "../../pages/layouts/AuthLayout";
import {Login} from "../../pages/Login";
import {Register} from "../../pages/Register";
import {StoresProvider, stores} from "../../store/stores";
import './App.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        path: '',
        element: <Main />
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      }
    ]
  }
])

const App = () => {
  return (
    <StoresProvider value={stores}>
      <RouterProvider router={router} />
    </StoresProvider>
)
}

export default App
