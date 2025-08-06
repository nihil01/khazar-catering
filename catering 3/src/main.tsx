import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Router } from 'wouter'
import {ThemeProvider} from "./components/user/ThemeContext.tsx";
import {LangProvider} from "./utils/LangContext.tsx";


createRoot(document.getElementById('root')!).render(
  <LangProvider>
    <Router>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Router>
  </LangProvider>
)
