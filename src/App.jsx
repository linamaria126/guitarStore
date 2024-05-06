import { useEffect, useState } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {
  const [data, setdata] = useState(db);
  const [cart, setCart] = useState([]);

   
  function addToCart(item){
    //finIndex() devuelve el índice del primer elemento del array que cumpla con la función de prueba proporcionada, en caso que no lo encuentre devuelve un -1
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);// en este caso devuelve el indice que tenga el mismo valor del que le estoy dando click, sino devuelve un -1
    if (itemExists >= 0){ //Significa que el valor ya existe en el carrito
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    }else{
      item.quantity = 1 // con este se está agregando una propiedad llamada quantity al item, el cual representa la guitarra después de haber sido agregada.
      setCart( [...cart, item])
    }
    
  }

  return (
    <>
    <Header 
      cart={cart}
    />
   
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar = {guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
         

           
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
