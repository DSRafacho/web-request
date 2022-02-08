import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { ReduxDispatch, ReduxState } from "../interfaces/redux";
// @ts-ignore
import { JsonFormatter } from 'react-json-formatter'


import { Constants } from '../Constants'

interface config {
    headers: string[];
    multipart: string[];
}

interface props {
    config?: config;
    dispatch?: Function
}

function Main(props: props) {
    const [url, setUrl] = useState('')
    const [httpMethod, setHttpMethod] = useState('get')
    const [body, setBody] = useState('')

    const [headers, setHeaders] = useState( [ { chave: "", valor: "" } ] )
    const [multiparts, setMultparts] = useState([ { chave: "", valor: "" } ] )

    const [requestData, setRequestData] = useState({})
    const [requestStatus, setRequestStatus] = useState('Sem status ainda 😢')
    const [error, setError] = useState('')

    const [header, setHeader] = useState({})


    const [multipart, setMultipart] = useState({})
    /*const [ headerIsJson, setHeaderIsJson ] = useState(false)
    const [ multipartIsJson, setMultipartIsJson ] = useState(false)*/

    function generateHeader() {
        interface IterableObject {
            [iteratedKey: string]: any
        }
        const newHeaderObject: IterableObject = {}

        for (let key in headers) {
            const item = headers[key]

            item.chave !== '' && item.valor !== '' ?
                newHeaderObject[item.chave] = item.valor
                :
                console.log(item)
        }
        console.log(newHeaderObject)
        setHeader(newHeaderObject)
    }

    const sample = `{
   
}
`

    const JsonStyle = {
        propertyStyle: { color: 'red' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' }
    }

    return (
        <div className="w-full min-h-full h-screen min-h-screen bg-white dark:bg-slate-900 text-sky-400/75 font-sans">

            <div className="flex flex-row justify-center pb-5">
                <h1 className="text-3xl font-bold underline mt-5">Web Request</h1>
            </div>


            <div className="grid grid-cols-8 gap-3 px-72 mb-10">

                <div className="col-span-2">
                    <label htmlFor="http-verb" className="block font-bold">Método</label>
                    <select id="http-verb" className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded-lg"
                            onChange={ event => setHttpMethod(event.target.value) }
                    >
                        <option value="get">GET</option>
                        <option value="post">POST</option>
                        <option value="put">PUT</option>
                        <option value="patch">PATCH</option>
                        <option value="delete">DELETE</option>
                    </select>
                </div>


                <div className="col-span-6">
                    <label htmlFor="url" className="block font-bold">Url</label>
                    <input id="url" type="text" className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded-lg"
                           value={url}
                           onChange={event => setUrl(event.target.value)}
                    />
                </div>

            </div>

            <div className="grid grid-cols-8 gap-3 px-72 mb-10">
                <div className="col-span-8">

                    <div className="flex flex-row justify-center pb-5">
                        <h1 className="text-xl font-bold  mt-5">Headers</h1>
                    </div>
                    {
                        headers.map(
                            (header, index) =>
                                <div key={index} className="col-span-8">


                                    <div className="flex justify-center gap-5">
                                        <input type="text" placeholder='Chave' className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded-lg my-2 p-2"
                                               value={headers[index].chave}
                                               onChange={
                                                   event => {
                                                       const newHeaders = [...headers]
                                                       newHeaders[index].chave = event.target.value

                                                       setHeaders(newHeaders)
                                                   }
                                               }
                                        />

                                        <input type="text" placeholder='Valor' className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded-lg my-2 p-2"
                                               value={headers[index].valor}
                                               onChange={
                                                   event => {
                                                       const newHeaders = [...headers]
                                                       newHeaders[index].valor = event.target.value

                                                       setHeaders(newHeaders)
                                                   }
                                               }
                                        />
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded-full"
                                            disabled={index !== 1 ? true : false }
                                            onClick={
                                                event => {
                                                    const newHeaders = headers.filter(
                                                        (item: object, index2: number) => index2 !== index
                                                    )
                                                    setHeaders(newHeaders)
                                                }
                                            }
                                        >
                                            <b className="fw">X</b>
                                        </button>

                                    </div>

                                </div>
                        )
                    }

                    <div className="flex flex-row justify-center pb-5 mt-10">
                        <button
                            className="bg-sky-600 rounded-3xl text-white border-2 border-sky-900 p-2hover:bg-sky-700 p-3"
                            onClick={ event => setHeaders([...headers, { chave: "", valor: "" }]) }
                        >Adicionar</button>
                    </div>

                </div>

            </div>


            {
                httpMethod !== 'get' &&
                <div className="grid grid-cols-8 gap-3 px-72 mb-10">

                    <div className="col-span-8">
                        <label className="font-bold block">Body</label>

                        <textarea name="" id="" cols={51} rows={10} className={Constants.inputPatternClasses} value={body}
                                  onChange={event => setBody(event.target.value)}
                        >
                        </textarea>
                    </div>

                </div>
            }

            <div className="grid grid-cols-8 gap-3 px-72 mb-10">

                <div className="col-span-8">

                    <div className="flex flex-row justify-center gap-14">

                        <button className="bg-sky-600 rounded-3xl text-white border-2 border-sky-900 p-2 hover:bg-sky-700"
                                onClick={
                                    async () => {
                                        if (url === '') {
                                            toast.error(
                                                <div>
                                                    <h5>Insira uma url</h5>
                                                </div>
                                            )
                                            return
                                        }

                                        generateHeader()

                                        toast.promise(
                                            // @ts-ignore
                                            axios({ method: httpMethod, url, data: body ? JSON.parse(body) : {}, headers: header, })
                                                .then(
                                                    res => {
                                                        setRequestData(res.data)
                                                        setRequestStatus(`${res.status}`)
                                                    }
                                                ).catch( e => console.log(e) )
                                            ,
                                            {
                                                pending: "Tá indo meu truta",
                                                success: "Deu bom meu truta",
                                                error: "Meu truta... Deu ruim",
                                            }
                                        )
                                    }
                                }
                        >Fazer requisição</button>

                        <button className="bg-sky-600 rounded-3xl text-white border-2 border-sky-900 p-3 hover:bg-sky-700"
                                onClick={ () => setRequestData('') }
                        >Zerar o response</button>

                    </div>

                </div>


            </div>

            <div className="grid grid-cols-8 gap-3 px-72 mb-10">

                <div className="col-span-8">
                    <div className="flex flex-row justify-center gap-14">

                        <h5>Status: <span>{requestStatus}</span></h5>
                        {/*<h5>Descrição status</h5>*/}


                    </div>
                </div>
            </div>

            <div className="grid grid-cols-8 gap-3 px-72 mb-10">

                <div className="col-span-8 text-xl border-solid border-2 border-sky-500 h-64">

                    {/*<JsonFormatter json={ sample } tabWith='4' JsonStyle={JsonStyle} />*/}

                    <p>
                        {
                            JSON.stringify(requestData)
                        }
                    </p>

                </div>

            </div>


        </div>
    )
}

const mapStateToProps = (state: ReduxState) => {
    return {
        config: state.config
    }
}

export default connect(mapStateToProps, null)(Main)
