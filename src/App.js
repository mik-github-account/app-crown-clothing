import { Route, Routes } from 'react-router-dom'

import Home from './routes/home/home.js'
import Navigation from './routes/navigation/navigation.js'
import Authentication from './components/authentication/authentication.js'
import Shop from './routes/shop/shop.js'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;