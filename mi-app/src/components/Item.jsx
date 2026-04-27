import { Link } from "react-router-dom";

function Item({ id, nombre, precio }) {
  return (
    <div>
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>

      <Link to={`/producto/${id}`}>
        Ver detalle
      </Link>
    </div>
  );
}

export default Item;