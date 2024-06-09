import React from 'react'
import Header from '../Components/Header/header'
import Footer from '../Components/Foorter/footer'
import BagSummary from '../Components/BagSummary'
import BagItem from '../Components/BagItem'
import { useSelector } from 'react-redux'

const Bag = () => {

 const bagIds = useSelector(state=>state.bag.bagList);
 const bagItems = useSelector(state=>state.items.items);

 const finalItems = bagItems.filter(item=>{
  const itemIndex = bagIds.indexOf(item.id);
  return itemIndex>=0;
 })
  return (
   
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
        {finalItems.map(item=><BagItem item={item}/>)}
        </div>
        <BagSummary></BagSummary>
        </div>
     
    </main>
   
  )
}

export default Bag
