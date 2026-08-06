import React, { useEffect, useState } from "react";
import "../assets/css/ProductsAdmin.css";

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../services/productoService";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import { obtenerMarcas } from "../services/marcaService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ProductsAdmin(){


const [products,setProducts] = useState([]);
const [marcas,setMarcas] = useState([]);

const [search,setSearch] = useState("");

const [openModal,setOpenModal] = useState(false);

const [confirmDelete,setConfirmDelete] = useState(false);

const [selected,setSelected] = useState(null);



const [form,setForm] = useState({

    nombre:"",
    descripcion:"",
    precio:"",
    stock:"",
    talla:"",
    imagen:"",
    marcaId:""

});



// ===============================
// CARGAR PRODUCTOS
// ===============================

useEffect(()=>{

    cargarProductos();

    cargarMarcas();

},[]);



const cargarProductos = async()=>{

    try{

        const data = await obtenerProductos();

        console.log(
            "PRODUCTOS:",
            data
        );


        setProducts(data);


    }catch(error){

    toast.error(
        error.response?.data?.mensaje ||
        "Error al cargar los productos"
    );

}

};
const cargarMarcas = async()=>{

    try{

        const data = await obtenerMarcas();

        console.log(
            "MARCAS:",
            data
        );

        setMarcas(data);


    }catch(error){

    toast.error(
        error.response?.data?.mensaje ||
        "Error al cargar las marcas"
    );

}

};




// ===============================
// BUSCADOR
// ===============================

const filtered = products.filter(product =>

    product.nombre
    ?.toLowerCase()
    .includes(search.toLowerCase())

    ||

    product.marca?.nombre
    ?.toLowerCase()
    .includes(search.toLowerCase())

);




// ===============================
// NUEVO PRODUCTO
// ===============================

const openNew = ()=>{


    setSelected(null);


    setForm({

        nombre:"",
        descripcion:"",
        precio:"",
        stock:"",
        talla:"",
        imagen:"",
        marcaId:""

    });


    setOpenModal(true);

};




// ===============================
// EDITAR
// ===============================

const openEdit = (product)=>{


    setSelected(product);


    setForm({

        nombre:product.nombre,

        descripcion:product.descripcion || "",

        precio:product.precio,

        stock:product.stock,

        talla:product.talla || "",

        imagen:product.imagen || "",

        marcaId:product.marcaId

    });


    setOpenModal(true);

};




// ===============================
// GUARDAR
// ===============================

const saveProduct = async()=>{

    if(!form.marcaId){

        toast.error("Selecciona una marca");
    return;

    }

    try{

        if(selected){

            await actualizarProducto(
                selected.id_producto,
                form
            );

            toast.success("Producto actualizado correctamente");

        }else{

            await crearProducto(form);

            toast.success("Producto creado correctamente");

        }

        await cargarProductos();

        setOpenModal(false);

    }catch(error){

        toast.error(

            error.response?.data?.mensaje ||

            "Error al guardar el producto"

        );

    }

};




// ===============================
// CONFIRMAR ELIMINAR
// ===============================

const askDelete = (product)=>{


    setSelected(product);

    setConfirmDelete(true);


};




// ===============================
// ELIMINAR
// ===============================

const deleteProduct = async()=>{

    try{

        await eliminarProducto(selected.id_producto);

        await cargarProductos();

        setConfirmDelete(false);

        toast.success("Producto eliminado correctamente");

    }catch(error){

        toast.error(

            error.response?.data?.mensaje ||

            "Error al eliminar el producto"

        );

    }

};


return(

<div>


<div className="page-header">


<div>

<h1>
Productos
</h1>


<p>
Administra todos los tenis disponibles.
</p>


</div>



<button onClick={openNew}>

+ Agregar producto

</button>


</div>





<input

className="search-box"

placeholder="Buscar producto..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>





<table className="admin-table">


<thead>

<tr>

<th>ID</th>

<th>Producto</th>

<th>Marca</th>

<th>Precio</th>

<th>Stock</th>

<th>Acciones</th>

</tr>

</thead>



<tbody>


{

filtered.map(product=>(


<tr key={product.id_producto}>


<td>

{product.id_producto}

</td>



<td>

{product.nombre}

</td>



<td>

{product.marca?.nombre}

</td>



<td>

${product.precio}

</td>



<td>

{product.stock}

</td>




<td>


<button

className="edit"

onClick={()=>openEdit(product)}

>

Editar

</button>




<button

className="delete"

onClick={()=>askDelete(product)}

>

Eliminar

</button>



</td>


</tr>


))


}



</tbody>


</table>






<Modal

open={openModal}

title={
selected
?
"Editar producto"
:
"Nuevo producto"
}

onClose={
()=>setOpenModal(false)
}

onSave={saveProduct}

>



<input

placeholder="Nombre"

value={form.nombre}

onChange={
e=>
setForm({

...form,

nombre:e.target.value

})
}

/>




<input

placeholder="Descripción"

value={form.descripcion}

onChange={
e=>
setForm({

...form,

descripcion:e.target.value

})
}

/>





<input

placeholder="Precio"

value={form.precio}

onChange={
e=>
setForm({

...form,

precio:e.target.value

})
}

/>





<input

placeholder="Stock"

value={form.stock}

onChange={
e=>
setForm({

...form,

stock:e.target.value

})
}

/>





<input

placeholder="Talla"

value={form.talla}

onChange={
e=>
setForm({

...form,

talla:e.target.value

})
}

/>





<input

placeholder="Imagen URL"

value={form.imagen}

onChange={
e=>
setForm({

...form,

imagen:e.target.value

})
}

/>
<select

value={form.marcaId}

onChange={
e=>

setForm({

...form,

marcaId:Number(e.target.value)

})

}

>


<option value="">
Selecciona una marca
</option>



{

marcas.map(marca=>(

<option

key={marca.id_marca}

value={marca.id_marca}

>

{marca.nombre}

</option>

))

}



</select>








</Modal>







<ConfirmModal

open={confirmDelete}

title="Eliminar producto"

message={
`¿Seguro que deseas eliminar ${selected?.nombre}?`
}

onCancel={
()=>setConfirmDelete(false)
}

onConfirm={deleteProduct}

/>

<ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    theme="colored"
/>

</div>


);


}