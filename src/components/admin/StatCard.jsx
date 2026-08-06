import "../assets/css/StatCard.css";
import {
FaArrowUp,
FaArrowDown
} from "react-icons/fa";

export default function StatCard({

titulo,
valor,
porcentaje,
positivo,
icono

}){

return(

<div className="stat-card">

<div className="stat-top">

<div className="stat-icon">

{icono}

</div>

<div
className={
positivo
?
"stat-change positive"
:
"stat-change negative"
}
>

{
positivo
?
<FaArrowUp/>
:
<FaArrowDown/>
}

<span>

{porcentaje}

</span>

</div>

</div>

<div className="stat-body">

<h4>

{titulo}

</h4>

<h2>

{valor}

</h2>

</div>

</div>

);

}