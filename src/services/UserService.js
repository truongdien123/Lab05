import axios from "axios"

export const createStudent = (studentCode , name, isActive) => {
    return axios.post(`https://student-api-nestjs.onrender.com/students`, {studentCode, name, isActive});
}

export const getListStudent = () => {
    return axios.get(`https://student-api-nestjs.onrender.com/students`);
}

export const putUpdateStudent = (id, name, isActive) => {
    return axios.put(`https://student-api-nestjs.onrender.com/students/${id}`, name, isActive);
}

export const deleteStudent = (_id) => {
    return axios.delete(`https://student-api-nestjs.onrender.com/students/${_id}`);
}