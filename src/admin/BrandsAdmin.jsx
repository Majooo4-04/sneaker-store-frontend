import React,{useState} from "react";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import "../assets/css/BrandsAdmin.css";

const initialBrands=[
{
id:1,
name:"Nike",
status:"Activa"
},
{
id:2,
name:"Adidas",
status:"Activa"
},
{
id:3,
name:"Jordan",
status:"Activa"
},
{
id:4,
name:"Puma",
status:"Inactiva"
}
];

export default function BrandsAdmin(){

const[brands,setBrands]=useState(initialBrands);

const[search,setSearch]=useState("");

const[openModal,setOpenModal]=useState(false);

const[confirmDelete,setConfirmDelete]=useState(false);

const[selected,setSelected]=useState(null);

const[form,setForm]=useState({
id:null,
name:"",
status:"Activa"
});

const filtered=brands.filter(b=>

b.name.toLowerCase().includes(search.toLowerCase())

);
function openNew(){

setSelected(null);

setForm({
id:null,
name:"",
status:"Activa"
});

setOpenModal(true);

}

function openEdit(brand){

setSelected(brand);

setForm(brand);

setOpenModal(true);

}

function saveBrand(){

if(form.name.trim()==="") return;

if(selected){

setBrands(

brands.map(b=>

b.id===selected.id

?

form

:

b

)

);

}else{

setBrands([

...brands,

{

...form,

id:Date.now()

}

]);

}

setOpenModal(false);

}

function askDelete(brand){

setSelected(brand);

setConfirmDelete(true);

}

function deleteBrand(){

setBrands(

brands.filter(

b=>b.id!==selected.id

)

);

setConfirmDelete(false);

}

function toggleStatus(id){

setBrands(

brands.map(brand=>

brand.id===id

?

{

...brand,

status:

brand.status==="Activa"

?

"Inactiva"

:

"Activa"

}

:

brand

)

);

}return(

<div>

<div className="page-header">

<div>

<h1>

Marcas

</h1>

<p>

Administra las marcas de tenis.

</p>

</div>

<button
onClick={openNew}
>

+ Nueva Marca

</button>

</div>

<input

className="search-box"

placeholder="Buscar marca..."

value={search}

onChange={e=>setSearch(e.target.value)}

/>

<table className="admin-table">

<thead>

<tr>

<th>ID</th>

<th>Marca</th>

<th>Estado</th>

<th>Acciones</th>

</tr>

</thead>

<tbody>

{

filtered.map(brand=>(

<tr key={brand.id}>

<td>

{brand.id}

</td>

<td>

{brand.name}

</td>

<td>

<span
className={
brand.status==="Activa"
?
"status active"
:
"status inactive"
}
>

{brand.status}

</span>

</td>

<td>

<button

className="edit"

onClick={()=>openEdit(brand)}

>

Editar

</button>

<button

className="status-btn"

onClick={()=>toggleStatus(brand.id)}

>

{

brand.status==="Activa"

?

"Desactivar"

:

"Activar"

}

</button>

<button

className="delete"

onClick={()=>askDelete(brand)}

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

title={selected?"Editar marca":"Nueva marca"}

onClose={()=>setOpenModal(false)}

onSave={saveBrand}

>

<input

placeholder="Nombre de la marca"

value={form.name}

onChange={e=>

setForm({

...form,

name:e.target.value

})

}

/>

<select

value={form.status}

onChange={e=>

setForm({

...form,

status:e.target.value

})

}

>

<option value="Activa">

Activa

</option>

<option value="Inactiva">

Inactiva

</option>

</select>

</Modal>

<ConfirmModal

open={confirmDelete}

title="Eliminar marca"

message={`¿Seguro que deseas eliminar ${selected?.name}?`}

onCancel={()=>setConfirmDelete(false)}

onConfirm={deleteBrand}

/>

</div>

);

}