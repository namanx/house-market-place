import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { collection,
        getDocs,
        query,
        where,
        orderBy,
        limit,
 } from "firebase/firestore";    

import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";


const Offers = () => {
    const [listings,setListings] = useState(null);
    const [loading,setloading] = useState(true);
    const params = useParams();

    useEffect(()=>{
        const fetchListings = async() =>{
            try{
                // Fetch Reference
                const ListingRef = collection(db,'listings');

                // Create a query
                const q = query(ListingRef,
                    where('offer','==',true),
                    orderBy('timestamp','desc'),
                    limit(10)
                )

                // execute the query 
                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) =>{
                    return listings.push({
                        id : doc.id,
                        data : doc.data(),
                    })
                })

                setListings(listings);
                setloading(false);
            }catch(error){
                toast.error("Error in fetching the listing data from the firebase ...")
                console.log(error);
            }
        }
        fetchListings();
    },[params.categoryName])
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
            Offers
        </p>
      </header>
      {loading ? 
      <Spinner /> : listings && listings.length > 0 ? 
      <>
      <main>
        <ul className="categoryListings">
            {listings.map((listing) =>(
                <ListingItem listing={listing.data}
                id={listing.id}
                key={listing.id}
                />
            ))}
        </ul>
      </main>
      </> : <p>There are no current Offers</p>}
    </div>
  )
}

export default Offers
