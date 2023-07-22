import { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
//import ModalP from "./components/ModalContacto";
//import TablaContacto from "./components/TablaContacto";
import ModalPersonaItem from "./components/ModalPersonaItem";
import TablaPersonaItem from "./components/TablaPersonaItem";

const App = () => {

    const [personaItems, setPersonaItems] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)

    const mostrarPersonaItems = async () => {
        const response = await fetch("api/personaitem/Lista");

        if (response.ok) {
            const data = await response.json();
            setPersonaItems(data)
        }
        else {
            console.log("Data list error.");
        }
    }

    useEffect(() => {
        mostrarPersonaItems()
    }, []);

    const guardarPersonaItem = async (personaItem) => {

        const response = await fetch("api/personaitem/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(personaItem)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarPersonaItems();
        }
    }

    const editarPersonaItem = async (personaItem) => {

        const response = await fetch("api/personaitem/Editar", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(personaItem)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarPersonaItems();
        }
    }

    const eliminarPersonaItem = async (id) => {

        var respuesta = window.confirm("Are you sure to delete this Person?");

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/personaitem/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarPersonaItems();
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Persons List</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>New Person Item</Button>
                            <hr />
                            <TablaPersonaItem data={personaItems}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarPersonaItem={eliminarPersonaItem}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalPersonaItem
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarPersonaItem={guardarPersonaItem}
                editar={editar}
                setEditar={setEditar}
                editarPersonaItem={editarPersonaItem}
            />
        </Container>
    )
}

export default App;