import { useDispatch, useSelector } from "react-redux"
import fetchStatusSlice, { markFetchDone, markIsFetching, markIsFetchingFinished } from "../data/fetchStatusSlice"
import { useEffect } from "react";
import { addInitialItems } from "../data/ItemsSlice";


const FetchItems = () => {
    const fetchSts = useSelector(store => store.fetchStatus);
    //console.log(fetchSts);

    const dispatch = useDispatch();

    // const onDataFetch = () => {
    //     if(fetchSts.fetchDone){
    //         return;
    //     }
    //     console.log("posts");
    //     fetch("http://localhost:8080/items", {signal})
    //       .then((res) => res.json())
    //       .then((items)=>console.log("items fetched : "+ items));
    //   };
      useEffect(() => {
        if(fetchSts.fetchDone){
            return;
        }
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(markIsFetching());
        fetch("http://localhost:8080/items", {signal})
        .then((res) => res.json())
        .then(({items})=>{
            dispatch(addInitialItems(items[0]));
            dispatch(markFetchDone());
            dispatch(markIsFetchingFinished());//for spinner
            console.log( items)
        });
    
    
        return () => {
          console.log("cleaning up useEffect..");
          controller.abort();
        };
      }, [fetchSts]);
  return (
    <>
  
    </>
  )
}

export default FetchItems
