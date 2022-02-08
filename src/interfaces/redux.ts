export interface ReduxState {
    config: string
}

export interface ReduxDispatch {
    criarHeader: Function
    deletarHeader: Function

    criarMultipart: Function
    deletarMultipart: Function

}
