import { collection, addDoc, getDocs, query, where } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { db } from "../firebase"

const useFirestore = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(()=> {
        getData()
    },[])

    const getData = async() => {
        try {
            setLoading(true);
            const dataRef = collection(db, 'urls')
            const q = query(
                dataRef,
                where('uid', '==' , 'UYG8Uhgu67yyKFSWWUN8')
            )
            const querySnapshot = await getDocs(q)
            const dataDb = querySnapshot.docs.map((doc)=> doc.data())
            setData(dataDb)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return {
      data, error, loading
  }
}

export default useFirestore
