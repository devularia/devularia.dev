// #=====================================================================#
// # I will try to implement a custom Navigation Menu after this commit. #
// # It should match the website’s current aesthetic and behavior        #
// #=====================================================================#

import { FaProjectDiagram, FaImages } from 'react-icons/fa'
import { FaNewspaper } from "react-icons/fa6";

export const routes = [
  { label: 'Projects', to: '/projects', icon: FaProjectDiagram },
  { label: 'Gallery', to: '/gallery', icon: FaImages },
  { label: 'Blog', to: '/blog', icon: FaNewspaper },
]
