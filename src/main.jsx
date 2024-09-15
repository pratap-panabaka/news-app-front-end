import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HeadlinesContextProvider } from './context/HeadlinesContext.jsx'
import { NewsContextProvider } from './context/NewsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NewsContextProvider>
    <HeadlinesContextProvider>
      <App />
    </HeadlinesContextProvider>
  </NewsContextProvider>
)
