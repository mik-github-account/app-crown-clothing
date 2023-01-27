import { Route, Routes } from 'react-router-dom'

import Home from './routes/home/home.js'
import Navigation from './routes/navigation/navigation.js'
import Signin from './components/signin/signin.js'

const Shop = () => {
  return (
    <h1>I am the shop page</h1>
  )
}

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/sign-in' element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default App;