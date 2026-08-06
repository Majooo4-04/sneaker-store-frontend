import React from "react";
import "../assets/css/ConfirmModal.css";

export default function ConfirmModal({

open,
title,
message,
onCancel,
onConfirm

}){

if(!open) return null;

return(

<div className="confirm-overlay">

<div className="confirm-box">

<div className="confirm-icon">

🗑

</div>

<h2>

{title}

</h2>

<p>

{message}

</p>

<div className="confirm-buttons">

<button
className="cancel"
onClick={onCancel}
>

Cancelar

</button>

<button
className="delete"
onClick={onConfirm}
>

Eliminar

</button>

</div>

</div>

</div>

)

}