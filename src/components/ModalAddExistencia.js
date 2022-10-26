import { useContext, useState } from "react"
import context from "../context/Context"


export default function ModalAddExistencia() {

    const {addEntrada,getEntradas,getItems} = useContext(context)

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
            await addEntrada(input.fecha,input.codigoProducto,input.descripcion,input.cantidad)
            getItems()
            getEntradas()
            setInput({
                "fecha":"",
                "codigoProducto":"",
                "descripcion":"",
                "cantidad":""
            })
            document.getElementById("formAddExistencia").reset()
        } catch (error) {
            setText(error)
            console.log(error)
        }
    }
    
    return(
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalAgregarEntradas">
                AgregarEntradas
            </button>

            <div className="modal fade" id="modalAgregarEntradas" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal Entrada</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="formAddExistencia" onSubmit={handleAdd}>
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