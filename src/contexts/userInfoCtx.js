import {createContext, useReducer} from "react";

export const userInfoCtx = createContext();
export const SIGN_IN_USER = "user/sign_in"
const initialState = {
    personal: {
        id: localStorage.getItem('userId') || "",
        username: localStorage.getItem('username') || ""
    }
}

const reducer = (state,action) => {
    switch(action.type) {
        case SIGN_IN_USER: {
            const newPersonalInfo = {
                id: action.payload.id,
                username: action.payload.username
            };
            return {...state, personal: {...state.personal ,...newPersonalInfo}}
        }
        default: {
            console.log("no state changes");
            return state;
        }
    }
}


export const UserInfoCtxProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer, initialState);
    return <userInfoCtx.Provider value={{state, dispatch}}>{children}</userInfoCtx.Provider>
}