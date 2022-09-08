import './App.css'
import { Route, Routes } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Movies from './Movies/Movies';
import Shows from './Shows/Shows';
import People from './People/People';
import Searched from './Searched/Searched';
import Movie from './Movies/Movie';
import Show from './Shows/Show';
import Person from './People/Person';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Searched' element={<Searched />} />
        <Route path='Movies'>
          <Route index element={<Movies />} />
          <Route path=':id' element={<Movie />} />
        </Route>
        <Route path='Shows'>
          <Route index element={<Shows />} />
          <Route path=':id' element={<Show />} />
        </Route>
        <Route path='People'>
          <Route index element={<People />} />
          <Route path=':id' element={<Person />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
