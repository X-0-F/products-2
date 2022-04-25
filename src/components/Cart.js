import React from "react";

function Cart( {confirmSelection, setConfirmSelection , catalog} ){
    const goToCheckout = () => {
        setConfirmSelection(!confirmSelection)
    }
    return(
        <div className="fixed flex items-start content-end" onClick={()=> goToCheckout()} >
            <div className="inset-y-0 inset-x-0 bottom-0">
                <span className="absolute h-5 w-5 bg-yellow-400 text-center rounded-full  text-black font-bold">{catalog.length}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 cursor-pointer link">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p className="hidden hover:underline cursor-pointer link md:inline font-bold md:text-sm mt-2">Carrito</p>
            </div>
        </div>
    )
}

export default Cart;