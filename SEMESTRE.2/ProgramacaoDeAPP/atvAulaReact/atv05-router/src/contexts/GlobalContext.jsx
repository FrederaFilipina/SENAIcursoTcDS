import { createContext, useState } from "react";

export const GlobalContext = createContext()

const GlobalContextProvider = ({children}) => {
    const[produto, setProduto]=useState('nome_do_Produto')
    const[produtos, setProdutos]=useState('nome_de_outros_Produtos')

    return(
        <GlobalContext.Provider value ={{produto, produtos}}>
            {children}
        </GlobalContext.Provider>
    )

}

export default GlobalContextProvider