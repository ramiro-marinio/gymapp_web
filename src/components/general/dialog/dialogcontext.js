import { createContext, useState } from "react";

export const DialogContext = createContext(undefined);

export default ({children}) =>{
    const [dialog,setDialog] = useState(undefined);
    return (
        <DialogContext.Provider value={{
            dialog:dialog,
            setDialog:setDialog,
        }}>
            {children}
        </DialogContext.Provider>
    )
}