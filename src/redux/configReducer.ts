import {Action, ActionTypes} from "./config";
import {combineReducers, createStore} from "redux";

const initialState = {
    headers: [
        { chave: "" },
        { chave: "" },
        { chave: "" },
    ],
    multipart: [
        { chave: "" },
        { chave: "" },
        { chave: "" },
    ],
}

export function ConfigReducer (state = initialState, action: Action) {
    var newState = { ...state }
    switch (action.type) {
        case ActionTypes.CRIAR_HEADER:
            console.log("´===> CRIAR_HEADER")
            break

        case ActionTypes.DELETAR_HEADER:
            console.log("´===> DELETAR_HEADER")
            break


        case ActionTypes.CRIAR_MULTIPART:
            console.log("´===> CRIAR_MULTIPART")
            break

        case ActionTypes.DELETAR_MULTIPART:
            console.log("´===> DELETAR_MULTIPART")
            break


        default:
            return state
    }
}




const reducers = combineReducers(
    {
        config: ConfigReducer
    }
)


export const store = createStore(reducers)