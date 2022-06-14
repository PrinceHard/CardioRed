import axios from "axios";
import { BASE_URL } from "../../utils/Consts";

export const findPacienteByCPF = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/pacientes/cpf/${searchInput}`);
        return [data];
    } catch (error) {
        return [{}];
    }
};

export const findAllPacientes = async (currentPage) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/pacientes?page=${currentPage}&size=10&sort=name`);
        return data;
    } catch (error) {
        return [{}];
    }
};

export const savePaciente = async (pacienteData) => {
    try {
        console.log(pacienteData);
        const response = await axios.post(`${BASE_URL}/pacientes`, pacienteData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updatePaciente = async (pacienteData) => {
    try {
        const response = await axios.put(`${BASE_URL}/pacientes`, pacienteData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deletePaciente = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/pacientes/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};