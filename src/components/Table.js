import { useContext, useEffect } from "react"
import DataTable from "react-data-table-component"
import context from "../context/Context"
import BtnDelete from "./BtnDelete"
import BtnUpdate from "./BtnUpdate"

export default function Table() {

    const {lstItems,getItems} = useContext(context)

    const lstProduct = lstItems.map(i => {return {...i,stock: i.existenciasIniciales + i.entradas - i. salidas}})

    const col =[{
        name:"Codigo Producto",
        selector: i => i.id,
        sortable:true,
        
    },{
        name:"Descripcion",
        selector:i => i.descripcion,
        sortable:true
    },{
        name: "Existencias Iniciales",
        selector:i =>i.existenciasIniciales,
        sortable:true
    },{
        name: "Entradas",
        selector:i =>i.entradas,
        sortable:true
    },{
        name:"Salidas",
        selector:i=>i.salidas,
        sortable:true
    },{
        name:"Stock",
        selector:i=>i.stock,
        sortable:true
    },{
        name:"actualizar",
        selector:i => <BtnUpdate key={i.id} id={i.id} descripcion={i.descripcion} existenciasIniciales={i.existenciasIniciales} ></BtnUpdate>
    },{
        name:"borrar",
        selector:i=> <BtnDelete key={i.id} id={i.id} coleccion={"productos"} ></BtnDelete>
    }]

    useEffect(() => {
      getItems()
      console.log("cargar")
    }, [])
    

    return(
        <>
            <DataTable 
                columns={col} 
                data={lstProduct}
                pagination>
            </DataTable>
        </>

    )
}