import api from "./api";

export async function obtenerResenasProducto(idProducto) {
  const res = await api.get(`/resenas/producto/${idProducto}`);
  return Array.isArray(res.data) ? res.data : [];
}