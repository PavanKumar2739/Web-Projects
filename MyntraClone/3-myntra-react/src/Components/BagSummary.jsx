import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const BagSummary = ({summary}) => {

  const bagIds = useSelector(state=>state.bag.bagList);
 const bagItems = useSelector(state=>state.items.items);
 const [CONVENIENCE_FEES,setCONVENIENCE_FEES] = useState(0);
  const[totalMRP,setTotalMRP] = useState(0);
  const[totalDiscount,setTotalDiscount] = useState(0);
  const[finalPayment,setFinalPayment] = useState(0);

  useEffect(()=>{
    const filterItems = bagItems.filter(item =>bagIds.includes(item.id) )
    const mrp = filterItems.reduce((i,item)=>i+item.original_price,0);
    const discount = filterItems.reduce((i,item)=>i+(item.original_price-item.current_price),0);
    const finalPrice = mrp-discount+CONVENIENCE_FEES;
    setFinalPayment(finalPrice);
    setTotalDiscount(discount);
    setTotalMRP(mrp);
    bagIds.length>0?setCONVENIENCE_FEES(99):setCONVENIENCE_FEES(0);
    
},[bagIds])
   
  return (
    <div className="bag-summary">
    <div className="bag-details-container">
    <div className="price-header">PRICE DETAILS ({bagIds.length}) Items</div>
    <div className="price-item">
      <span className="price-item-tag">Total MRP</span>
      <span className="price-item-value">₹{totalMRP}</span>
    </div>
    <div className="price-item">
      <span className="price-item-tag">Discount on MRP</span>
      <span className="price-item-value priceDetail-base-discount">-₹{totalDiscount}</span>
    </div>
    <div className="price-item">
      <span className="price-item-tag">Convenience Fee</span>
      <span className="price-item-value">₹{CONVENIENCE_FEES}</span>
    </div>
    <hr/>
    <div className="price-footer">
      <span className="price-item-tag">Total Amount</span>
      <span className="price-item-value">₹{finalPayment}</span>
    </div>
  </div>
  <button className="btn-place-order">
    <div className="css-xjhrni">PLACE ORDER</div>
  </button>
      
    </div>
  )
}

export default BagSummary
