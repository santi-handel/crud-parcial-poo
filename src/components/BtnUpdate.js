import { useContext, useState } from "react"
import context from "../context/Context"

export default function BtnUpdate(props) {

    const {getItems,updateItem} = useContext(context)


    const [text,setText] = useState("")
    const [input,setInput] = useState({
        "descripcion":props.descripcion,
        "existenciasIniciales":props.existenciasIniciales

    })

    const handleChange = ({target:{name,value}}) => setInput({...input,[name]:value})

    const handleUpdate = async(e) =>{
        e.preventDefault()
        try {
            await updateItem(props.id,input.descripcion,input.existenciasIniciales)
            getItems()
        } catch (error) {
            setText(error)
            console.log(error)
        }
    }

    return (
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#modalActualizarExistencia"+props.id}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
            </button>

            <div className="modal fade" id={"modalActualizarExistencia"+props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal actualizar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdate}>
                                <input className="form-control my-2" name="descripcion" onChange={handleChange} defaultValue = {props.descripcion}></input>
                                <input className="form-control my-2" name="existenciasIniciales" onChange={handleChange} defaultValue = {props.existenciasIniciales}></input>
                                <button className="btn btn-danger" onClick={handleUpdate} type="submit">actualizar</button>
                            </form>
                        </div>
                        <div className="modal-footer text center">
                            <h6>{text}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}