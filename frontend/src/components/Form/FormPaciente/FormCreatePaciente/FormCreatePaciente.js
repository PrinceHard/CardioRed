import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import { getPacienteByCPF } from "../../../../services/Paciente/PacienteService";

const FormCreatePaciente = ({ newPacienteData, setNewPacienteData, savePaciente, setShow }) => {
    const pacienteChange = (event) => {
        if (event.target.name === "birthDate") {
            setNewPacienteData({
                ...newPacienteData,
                [event.target.name]: moment(event.target.value).format("DD/MM/yyyy"),
            });
            return;
        }

        if (event.target.name === "name") {
            const inputed = event.target.value;
            setNewPacienteData({
                ...newPacienteData,
                name: inputed.charAt(0).toUpperCase() + inputed.slice(1),
            });
            return;
        }

        if (event.target.name === "cpf") {
            const inputed = event.target.value;
            setNewPacienteData({
                ...newPacienteData,
                cpf: event.target.value.replaceAll(".", "").replace("-", ""),
            });
            return;
        }

        setNewPacienteData({
            ...newPacienteData,
            [event.target.name]: event.target.value,
        });
    };

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateCPF(newPacienteData.cpf)) {
            setCpfIsInvalid(true);
            setCpfErrorMessage("CPF inválido!");
        }
        if (cpfIsInvalid) {
            return;
        }
        if (event.currentTarget.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            savePaciente();
        }

        setValidated(true);
    };

    const [cpfErrorMessage, setCpfErrorMessage] = useState("Informe o CPF do paciente.");
    const [cpfIsInvalid, setCpfIsInvalid] = useState(false);
    const verifyCPF = () => {
        setCpfIsInvalid(false);
        getPacienteByCPF(newPacienteData.cpf).then((res) => {
            if (res.data) {
                setCpfIsInvalid(true);
                setCpfErrorMessage("CPF já cadastrado no sistema.");
            }
        });
    };

    const validateCPF = (strCPF) => {
        let sum;
        let remainder;
        sum = 0;
        if (strCPF == "00000000000" || strCPF == undefined) return false;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;

        if (remainder == 10 || remainder == 11) remainder = 0;
        if (remainder != parseInt(strCPF.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;

        if (remainder == 10 || remainder == 11) remainder = 0;
        if (remainder != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    };

    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    };

    let typingTimer;
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    CPF*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        pattern="^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"
                        autoComplete="off"
                        isInvalid={cpfIsInvalid}
                        value={newPacienteData.cpf ? maskCPF(newPacienteData.cpf) : ""}
                        required
                        type="text"
                        name="cpf"
                        onKeyUp={() => {
                            clearTimeout(typingTimer);
                            typingTimer = setTimeout(verifyCPF, 1000);
                        }}
                        onKeyDown={(e) => {
                            clearTimeout(typingTimer);
                        }}
                        maxLength="14"
                        onChange={pacienteChange}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        {cpfErrorMessage}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Nome*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control autoComplete="off" required type="text" name="name" onChange={pacienteChange} />

                    <Form.Control.Feedback tooltip type="invalid">
                        Informe o nome do paciente.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Sexo*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select required type="text" name="gender" onChange={pacienteChange}>
                        <option value="">Escolha uma opção</option>
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                    </Form.Select>
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe o sexo do paciente.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Cor*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select required type="text" name="ethnicity" onChange={pacienteChange}>
                        <option value="">Escolha uma opção</option>
                        <option value="Branco">Branco</option>
                        <option value="Preto">Preto</option>
                        <option value="Pardo">Pardo</option>
                        <option value="Amarelo">Amarelo</option>
                        <option value="Indígena">Indígena</option>
                    </Form.Select>
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a cor do paciente.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                    Data de Nascimento*:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        max={moment(new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)).format("YYYY-MM-DD")}
                        required
                        type="date"
                        name="birthDate"
                        onChange={pacienteChange}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a data de nascimento do paciente.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <div className="modal-footer d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-primary btn-modal btn-left"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary btn-modal">
                    Concluir
                </button>
            </div>
        </Form>
    );
};

export default FormCreatePaciente;
