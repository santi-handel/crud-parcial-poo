import { useContext, useEffect } from "react"
import DataTable from "react-data-table-component"
import context from "../context/Context"
import BtnDelete from "./BtnDelete"
import BtnUpdate from "./BtnUpdate"

export default function TableEntradas() {

    const {lstEntradas,getEntradas} = useContext(context)


    const col =[{
        name:"Numero Factura",
        selector: i => i.id,
        sortable:true
    },{
        name:"Fecha",
        selector:i => i.fecha,
        sortable:true
    },{
        name: "Codigo Producto",
        selector:i =>i.codigoProducto,
        sortable:true
    },{
        name: "Descripcion",
        selector:i =>i.descripcion,
        sortable:true
    },{
        name:"Cantidad",
        selector:i=>i.cantidad,
        sortable:true
    },{
        name:"borrar",
        selector:i=> <BtnDelete key={i.id} id={i.id} coleccion={"entradas"}></BtnDelete>
    }]

    useEffect(() => {
      getEntradas()
      console.log("cargar entradas")
    }, [])
    

    return(
        <>
            <DataTable 
                columns={col} 
                data={lstEntradas}
                pagination>
            </DataTable>
        </>

    )
}