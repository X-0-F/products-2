import React, { useEffect, useState } from 'react';
import Checkout from './Checkout';
import Cart from './Cart'



function Productos() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [confirmSelection, setConfirmSelection] = useState(false);
    const [processComplete, setProcessComplete] = useState(false);
    const [catalog, setCatalog] = useState(() => {
        const localStorageCatalog = JSON.parse(localStorage.getItem("catalog"));
        if (localStorageCatalog)
          return localStorageCatalog;
        return [];
      });


    useEffect(() => {
        window.localStorage.setItem("catalog", JSON.stringify(catalog));
    }, [catalog]);

    // Pagina actual
    const [selectPage, setSelectPage] = useState(1);
 
    // Cantidad de pag
    const [cantPages, setCantPages] = useState(0);
    useEffect(() => {
        setCantPages(Math.ceil(items.length / 12))
    }, [items]);


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://fakestoreapi.com/products?limit=50")
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setItems(result);
            },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])
    
    if (error) {
        return <div>Ha ocurrido un error, intente luego. {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Cargando...</div>;
    } else {
        return (
        <div>
            <Cart confirmSelection={confirmSelection} setConfirmSelection={setConfirmSelection} catalog={catalog} />   
            <div className={`mt-16 p-10 ${processComplete ? 'hidden' : ''}`}>
                <div className={`mt-5 ${confirmSelection && 'hidden'}`}>
                    <h3 className='text-gray-600 text-2xl font-medium'>Productos</h3>
                    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
                        {items.slice((selectPage-1) * 12).map( (item, index) => index < 12 && (
                            <div key={item.id} className="relative flex flex-col m-5 bg-white z-30 p-10 growing-hover">
                            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                              {item.category}
                            </p>
                      
                            <img src={item.image} height={200} width={200}/>
                      
                            <h4 className="my-3 ">{item.title}</h4>
                      
                            {/* mt-2 mb-2 == my-2 */}
                            <p className="text-xs my-2 line-clamp-2">{item.description}</p>
                            <div className="mb-5">
                              US${item.price}
                            </div>
                      
                            <button className="mt-auto button" onClick={()=> setCatalog([...catalog, item.id])}>
                              Agregar al carrito
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className='flex flex-wrap gap-y-2 justify-center'>
                        <div className="flex items-center space-x-1 mt-8">
                            <button onClick={()=> (selectPage > 1) && setSelectPage(selectPage-1)} className="px-5 py-4 cursor-pointer text-gray-500 bg-gray-300 rounded-md hover:bg-slate-900 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                            </button>
                            {
                                [...Array(cantPages)].map((e, i) => 
                                <button key={i+1} onClick={()=> setSelectPage(i+1)} className="px-5 py-4 cursor-pointer text-gray-700 bg-gray-200 rounded-md hover:bg-slate-900 hover:text-white">
                                    {i+1}
                                </button>
                                )
                            }

                            <button onClick={()=> (selectPage < cantPages) && setSelectPage(selectPage+1)} className="px-5 py-4 cursor-pointer text-gray-500 bg-gray-300 rounded-md hover:bg-slate-900 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={` bg-slate-200 ${!confirmSelection && 'hidden'}`}  >
                        <Checkout catalog={catalog} setCatalog={setCatalog} confirmSelection={confirmSelection} setConfirmSelection={setConfirmSelection} items={items} setItems={setItems} />
                </div>

            </div>
            <div className={` text-2xl ${!processComplete && 'hidden'} `}> Congrats!</div>
        </div> 
        );
    }
}

export default Productos;