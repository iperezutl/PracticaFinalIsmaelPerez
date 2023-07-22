import { Button, Table } from "reactstrap";

const TablaPersonaItem = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarPersonaItem }) => {

    const enviarDatos = (personaItem) => {
        setEditar(personaItem)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Is Completed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">No Data</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idPersonaItem}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.isCompleted}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>Edit</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarPersonaItem(item.idPersonaItem)} >Delete</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaPersonaItem;
