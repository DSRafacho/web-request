export interface Action {
    type: string;
    payload: string | object | Array<any>
}

export const ActionTypes = {
    CRIAR_HEADER: "CRIAR_HEADER",
    DELETAR_HEADER: "DELETAR_HEADER",

    CRIAR_MULTIPART: "CRIAR_MULTIPART",
    DELETAR_MULTIPART: "DELETAR_MULTIPART",
}

export function acao(actionType:string, payload=null) {
    return { type: actionType, payload: payload }
}
