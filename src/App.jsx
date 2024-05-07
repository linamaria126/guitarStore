import { useEffect, useState } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);


  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() =>{
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])

// Función para adicionar guitarras al carrito

     function addToCart(item){
    //finIndex() devuelve el índice del primer elemento del array que cumpla con la función de prueba proporcionada, en caso que no lo encuentre devuelve un -1
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);// en este caso devuelve el indice que tenga el mismo valor del que le estoy dando click, sino devuelve un -1
    if (itemExists >= 0 ){ //Significa que el valor ya existe en el carrito
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    }else{
      item.quantity = 1 // con este se está agregando una propiedad llamada quantity al item, el cual representa la guitarra después de haber sido agregada.
      setCart( [...cart, item])
    } 
        
  }

  //Función para borrar guitarras del carrito

  function removeFromCart(id){
    //const prevCart = cart.filter((guitar) => guitar.id !== id) 
    //setCart(prevCart) //modo como lo aprendí en 4Geeks

    //modo como lo hace el profesor Juan de la Torre (ambas formas funcionan)
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  //Función para disminuír la cantidad de guitarras del carrito

  function decreaseQuantity(id){
    const updateCart = cart.map((guitar) => {
      if(guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return {...guitar, quantity:guitar.quantity -1}
      }
      return guitar;
    })
    setCart(updateCart);
  }


  //Función para aumentar la cantidad de guitarras del carrito

  function increaseQuantity(id) {
    const updateCart = cart.map((guitar) => {
      if(guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return {...guitar, quantity:guitar.quantity + 1}
      }
      return guitar;
    })
    setCart(updateCart)
  }

 //función para vaciar el carrito

 function cleanCart() {
  setCart([])
 }



  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      cleanCart={cleanCart}
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
              cleanCart={cleanCart}
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
