import { useMemo, useState, ChangeEvent } from "react";

//Dado un array de objetos “products”, mostrarlos en una lista con opción de búsqueda. 
//Escribir un componente funcional que filtre mientras el usuario escribe.


const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Keyboard" },
  { id: 4, name: "Monitor" },
];

export default function ProductList() {
  const [query, setQuery]= useState("")

  const productFilter = useMemo(() =>{
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query])

  const handleSetQuery = (e) =>{
    setQuery(e.target.value)
  }

  return (
    <div>
      <input
        placeholder="Buscar producto"
        value={query}
        onChange={handleSetQuery}
      />

      <ul>
        {
          productFilter.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))
        }
      </ul>
    </div>
  );
}; 