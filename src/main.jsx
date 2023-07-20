import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import VideoDetail from './Home/VideoDetail.jsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './Home/Homepage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/",
        element:<Homepage></Homepage>,
      },
      {
        path:"video-detail",
        element: <VideoDetail></VideoDetail>
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
