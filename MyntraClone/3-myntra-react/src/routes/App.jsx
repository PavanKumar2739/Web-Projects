import { useState } from 'react'
import Header from '../Components/Header/header'
import Footer from '../Components/Foorter/footer'
import HomeItem from '../Components/Home/HomeItem'
import { Outlet } from 'react-router-dom';
import FetchItems from '../Components/FetchItems';
import { useSelector } from 'react-redux';
import Spinner from '../Components/loading/spinner';


function App() {
  const [count, setCount] = useState(0);
  const fetchSts = useSelector(store => store.fetchStatus);

  return (
  <>
    <Header/>
    <FetchItems/>
   {fetchSts.currentlyFetching ?<Spinner/>:<Outlet/>}
    <Footer/>
  </>
  )
}

export default App
