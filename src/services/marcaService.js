import api from "./api";


export const obtenerMarcas = async()=>{

    const response = await api.get("/marcas");

    return response.data;

};