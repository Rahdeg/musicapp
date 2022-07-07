import React,{createContext,useContext,useReducer} from "react";

export const stateContex= createContext();

export const StateProvider=({reducer,initialState,children})=>(
     // eslint-disable-next-line react-hooks/rules-of-hooks
     <stateContex.Provider value={useReducer(reducer,initialState)}>
        {children}
     </stateContex.Provider>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useStateValue =()=> useContext(stateContex);