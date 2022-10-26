import { useContext, useState } from "react"
import context from "../context/Context"


export default function ModalAdd() {

    const {addItem,getItems} = useContext(context)

    const [text,setText] = useState("")
    const [input,setInput] = useState({
        "descripcion":"",
        "existenciasIniciales":""
    })

    const handleChange = ({target:{name,value}}) => setInput({...input,[name]:value})

    const handleAdd = async(e) =>{
        e.preventDefault()
        try {
            if (input.descripcion === "" && input.existenciasIniciales=== "") throw "las casilla no pueden estar vacias"
            await addItem(input.descripcion,input.existenciasIniciales)
            getItems()
            setInput({
                "descripcion":"",
                "existenciasIniciales":""
            })
            document.getElementById("formAdd").reset()
        } catch (error) {
            setText(error)
            console.log(error)
        }
    }
    
    return(
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalAgregarExistencia">
                AgregarExistencia
            </button>

            <div className="modal fade" id="modalAgregarExistencia" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal Agregar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="formAdd" onSubmit={handleAdd}>
                                <input className="form-control my-2" name="descripcion" onChange={handleChange} defaultValue=""></input>
                                <input className="form-control my-2" name="existenciasIniciales" onChange={handleChange} defaultValue=""></input>
                                <button className="btn btn-secondary" onClick={handleAdd} type="submit">Agregar</button>
                            </form>
                        </div>
                        <div className="modal-footer text-center">
                            <h6>{text}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}