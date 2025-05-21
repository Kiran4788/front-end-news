
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Articles from './components/Articles'
import Article from './components/Article'
import Topics from './components/Topics'

function App() {
 

  return (
    <>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/topics" element={<Topics />} />
      </Routes>
    </>
  )
}

export default App
