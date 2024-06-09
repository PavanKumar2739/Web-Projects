//import imageItem from 'images/1.jpg'

import { useDispatch, useSelector } from "react-redux";
import { addToBag, removeFromBag } from "../../data/bagSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

//above way it will be hard to workout
const HomeItem = ({item}) => {
 const dispatch = useDispatch();
 const bagList =  useSelector(state=>state.bag.bagList);
 const findIndex = bagList.indexOf(item.id)>=0;
console.log(item,findIndex);

    const handleAddBag=()=>{
      dispatch(addToBag(item.id))
    }
    const handleRemove=()=>{
      dispatch(removeFromBag(item.id))
    }
  return (
    <>
       <div className="item-container">
      <img className="item-image" src={item.image} alt="item image"/>
      <div className="rating">
          {item.rating.stars} ⭐ | {item.rating.count}
      </div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>
      <div className="price">
          <span className="current-price">Rs {item.current_price}</span>
          <span className="original-price">Rs {item.original_price}</span>
          <span className="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      {!findIndex?<button type="button" className="btn-add-bag btn btn-success" onClick={(e)=>handleAddBag()}><IoIosAddCircleOutline/>Add to Bag</button>
     :
      <button type="button" className="btn-add-bag btn btn-danger" onClick={handleRemove}><MdDelete/>Danger</button>}
    </div>
    </>
  )
}

export default HomeItem;
