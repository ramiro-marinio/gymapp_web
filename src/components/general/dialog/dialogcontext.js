import { createContext, useState } from "react";

export const DialogContext = createContext(undefined);

export default function DialogProvider({children}){
    const [dialog,setDialog] = useState(undefined);
    return (
        <DialogContext.Provider value={{
            dialog:dialog,
            setDialog:(value)=>{
                if(value==null){
                    document.getElementById('my_modal_2').close();
                    return;
                }
                setDialog(value);
                document.getElementById('my_modal_2').showModal();
            },
        }}>
            {children}
        </DialogContext.Provider>
    )
}