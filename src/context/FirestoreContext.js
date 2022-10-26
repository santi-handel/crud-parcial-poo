import DbContext from "./Context"
import {setDoc,doc,updateDoc,deleteDoc,getDocs,collection} from "firebase/firestore"
import db from "../services/firebase"
import { useState } from "react"

export default function FirestoreContext(props) {
    const {children} = props

    const [items,setItems] = useState([])
    const [entradas,setEntradas] = useState([])
    const[salidas,setSalidas] =useState([])

    const incrementalID = async(coleccion) =>{
        let count = -1
        const snap = await getDocs(collection(db,coleccion))
        snap.forEach((i)=>{
            if(parseInt(i.id)  > count){
                count = parseInt(i.id)
            }
        })
        return count + 1
    }

    const getItems = async() =>{
        const lst = []
        const snap = await getDocs(collection(db,"productos"))
        snap.forEach((i)=>{
            lst.push({
                ...i.data(),
                id:i.id
            })
        })
        setItems(lst)
    }

    const addItem = async(descripcion,existenciasIniciales) =>{
        await setDoc(doc(db,"productos", (await incrementalID("productos")).toString() ),{
            "descripcion":descripcion,
            "existenciasIniciales":parseInt(existenciasIniciales) ,
            "entradas":0,
            "salidas":0,

        })
    }

    const deleteItem = async(id,coleccion)=>{
        await deleteDoc(doc(db,coleccion,id))
    }

    const updateItem = async (id,descripcion,existenciasIniciales)=>{
        await updateDoc(doc(db,"productos",id),{
            "descripcion":descripcion,
            "existenciasIniciales": parseInt(existenciasIniciales) 
        })
    }
 /* funciones para entradas */
    const addEntrada = async(fecha,codigoProducto,descripcion,cantidad)=>{
        await setDoc(doc(db,"entradas", (await incrementalID("entradas")).toString()),{
            "fecha":fecha,
            "codigoProducto":codigoProducto,
            "descripcion":descripcion,
            "cantidad":parseInt(cantidad) 
        })
        const snap = await getDocs(collection(db,"productos"))
        snap.forEach(i => {
            if(i.id === codigoProducto){
                 updateDoc(doc(db,"productos",codigoProducto),{
                "entradas": i.data().entradas + parseInt(cantidad) 
                }) 
            } 
            
        });
    }

    const getEntradas = async()=>{
        const lst = []
        const snap = await getDocs(collection(db,"entradas"))
        snap.forEach(i => {
            lst.push({...i.data(),id:i.id})
        })
        setEntradas(lst)
    }


    const getSalidas = async()=>{
        const lst = []
        const snap = await getDocs(collection(db,"salidas"))
        snap.forEach(i=>{
            lst.push({...i.data(),id:i.id})
        })
        setSalidas(lst)
    }

    const addSalida=async(fecha,codigoProducto,descripcion,cantidad) =>{
        await setDoc(doc(db,"salidas", (await incrementalID("salidas")).toString()),{
            "fecha":fecha,
            "codigoProducto":codigoProducto,
            "descripcion":descripcion,
            "cantidad":parseInt(cantidad) 
        })
        const snap = await getDocs(collection(db,"productos"))
        snap.forEach(i => {
            if(i.id === codigoProducto){
                 updateDoc(doc(db,"productos",codigoProducto),{
                "salidas": i.data().salidas + parseInt(cantidad) 
                }) 
            } 
            
        });
    }
    return(
        <DbContext.Provider value={{
            addItem,
            deleteItem,
            updateItem,
            getItems,
            lstItems:items,
            getEntradas,
            lstEntradas:entradas,
            addEntrada,
            getSalidas,
            addSalida,
            lstSalida:salidas
        }} >{children} </DbContext.Provider>
    )
}