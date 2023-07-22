import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from "reactstrap"

//Definimos el modelo del Contacto
const modeloPersonaItem = {
    idPersonaItem: 0,
    name: "",
    description: "",
    isCompleted: ""
}

const ModalPersonaItem = ({ mostrarModal, setMostrarModal, guardarPersonaItem, editar, setEditar, editarPersonaItem }) => {

    //Agregamos un estado para el componente
    const [personaItem, setPersonaItem] = useState(modeloPersonaItem);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setPersonaItem(
            {
                ...personaItem,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (personaItem.idPersonaItem == 0) {
            guardarPersonaItem(personaItem);
        }
        else {
            editarPersonaItem(personaItem);
        }
    }

    useEffect(() => {
        if (editar != null) {
            setPersonaItem(editar);
        }
        else {
            setPersonaItem(modeloPersonaItem);
        }
    }, [editar])

    //Método para cerrar el modal.
    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        setEditar(null);
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {personaItem.idPersonaItem == 0 ? "New Persona Item" : "Edit Persona Item"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input name="name" onChange={(e) => actualizaDato(e)} value={personaItem.name} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input name="description" onChange={(e) => actualizaDato(e)} value={personaItem.description} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Is Completed</Label>
                        <Input name="isCompleted" onChange={(e) => actualizaDato(e)} value={personaItem.isCompleted} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Save</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalPersonaItem;