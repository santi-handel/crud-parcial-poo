import { useContext, useState } from "react"
import context from "../context/Context"


export default function ModalAddSalida() {

    const {addSalida,getSalidas,getItems} = useContext(context)

    const [text,setText] = useState("")
    const [input,setInput] = useState({
        "fecha":"",
        "codigoProducto":"",
        "descripcion":"",
        "cantidad":""
    })

    const handleChange = ({target:{name,value}}) => setInput({...input,[name]:value})

    const handleAdd = async(e) =>{
        e.preventDefault()
        try {
            if (input.fecha === "" && input.codigoProducto=== "" && input.descripcion==="" && input.cantidad==="") throw "las casilla no pueden estar vacias"
            await addSalida(input.fecha,input.codigoProducto,input.descripcion,input.cantidad)
            getItems()
            getSalidas()
            setInput({
                "fecha":"",
                "codigoProducto":"",
                "descripcion":"",
                "cantidad":""
            })
            document.getElementById("formAddSalida").reset()
        } catch (error) {
            setText(error)
            console.log(error)
        }
    }
    
    return(
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalAgregarSalida">
                AgregarSalidas
            </button>

            <div className="modal fade" id="modalAgregarSalida" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal Salida</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="formAddSalida" onSubmit={handleAdd}>
                                <input className="form-control my-2" name="fecha" onChange={handleChange} ></input>
                                <input className="form-control my-2" name="codigoProducto" onChange={handleChange} ></input>
                                <input className="form-control my-2" name="descripcion" onChange={handleChange} ></input>
                                <input className="form-control my-2" name="cantidad" onChange={handleChange} ></input>
                                <button className="btn btn-secondary" onClick={handleAdd} type="submit">Agregar</button>
                            </form>
                        </div>
                        <div className="modal-footer text-center">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}