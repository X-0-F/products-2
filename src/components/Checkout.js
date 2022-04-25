import React, { useState }  from "react";


function Checkout( {catalog, setCatalog, confirmSelection, setConfirmSelection, items, setItems} ){
    const removerTodos = (i) => {
        const arr = catalog.filter((item) => item !== i);
        setCatalog(arr);
    };

    const removerUno = (i) => {
        var lastIndex = catalog.lastIndexOf(i)
        setCatalog([
            ...catalog.slice(0, lastIndex),
            ...catalog.slice(lastIndex + 1)
          ]);
    };

    const costoTotal = () => {
        var costo = 0
        catalog.map(i => costo = costo + items[i].price)
        return costo.toFixed(1)
    }
    
    const [costoEnvio, setCostoEnvio] = useState(0);

    return(
            <div className="bg-gray-100">
            <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">Carrito de compras</h1>
                    <h2 className="font-semibold text-2xl"> Productos</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalle</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Cantidad</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Precio</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Total</h3>
                    </div>

                    {items.filter(item =>catalog.includes(item.id)).map( item => (
                        <div key={'check_'+item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">

                        <div className="flex w-2/5"> 
                            <div className="w-20">
                            <img className="h-24" src={item.image} alt=""/>
                            </div>
                            <div className="flex flex-col justify-between ml-4 flex-grow">
                            <span className="font-bold text-sm">{item.title}</span>
                            <span className="text-red-500 text-xs">{item.title}</span>
                            <a onClick={()=> removerTodos(item.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Quitar</a>
                            </div>
                        </div>

                        <div className="flex justify-center w-1/5">
                            <svg  onClick={()=> removerUno(item.id)} className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>

                            <input className="mx-2 border text-center w-8" type="text" value={catalog.filter(c => c === item.id).length} />

                            <svg onClick={()=> {setCatalog([...catalog, item.id])}} className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>
                        </div>
                        <span className="text-center w-1/5 font-semibold text-sm">${item.price.toFixed(1)}</span>
                        <span className="text-center w-1/5 font-semibold text-sm">${(item.price * (catalog.filter(c => c === item.id).length)).toFixed(1)}</span>
                        </div>
                    ))}


                    <a onClick={()=> setConfirmSelection(!confirmSelection)} className="flex font-semibold text-indigo-600 text-sm mt-10 cursor-pointer">
                
                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                    Continuar comprando
                    </a>
                </div>

                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Orden completa</h1>
                    <div className="flex justify-between mt-10 mb-5">
                    <span className="font-semibold text-sm uppercase">Items {catalog.length}</span>
                    <span className="font-semibold text-sm">${costoTotal()}</span>
                    </div>
                    <div>
                    <label className="font-medium inline-block mb-3 text-sm uppercase">Envío</label>
                    <select value={costoEnvio} onChange={(ev)=> setCostoEnvio(ev.target.value)} className="block p-2 text-gray-600 w-full text-sm" >
                        <option value='0'>Arreglo con el vendedor</option>
                        <option value='500'>Envío por DAC - $500.00</option>
                        <option value='250'>Delivery - $250.00</option>
                    </select>
                    </div>
                    <div className="py-10">
                    <label forhtml='promocion' className="font-semibold inline-block mb-3 text-sm uppercase">Código promocional</label>
                    <input type="text" id='promocion' placeholder="Ingresá tu código" className="p-2 text-sm w-full"/>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Aplicar</button>
                    <div className="border-t mt-8">
                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total a pagar</span>
                        <span>${+costoTotal()+ +costoEnvio}</span>
                    </div>
                    <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                    </div>
                </div>

                </div>
            </div>
            </div>

    )
}

export default Checkout;