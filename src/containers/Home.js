import ModalAdd from "../components/ModalAdd";
import Table from "../components/Table";
import TableEntradas from "../components/TablaEntradas";
import ModalAddExistencia from "../components/ModalAddExistencia";
import TableSalida from "../components/TablaSalida";
import ModalAddSalida from "../components/ModalAddSalida";
export default function Home() {


    return(
        <>
        <div className="text-center bg-black">
            <h1 className="text-white text-center">PRODUCTOS</h1>
            <ModalAdd></ModalAdd>
            <Table></Table>
            <h1 className="text-white text-center">ENTRADAS</h1>
            <ModalAddExistencia></ModalAddExistencia>
            <TableEntradas></TableEntradas>
            <h1 className="text-white text-center ">SALIDAS</h1>
            <ModalAddSalida></ModalAddSalida>
            <TableSalida></TableSalida>
            </div>
        </>
    )
}