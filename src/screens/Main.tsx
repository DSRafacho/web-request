import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Constants } from '../Constants'
// @ts-ignore
import { JsonFormatter } from 'react-json-formatter'


function Main() {
    const [url, setUrl] = useState('')
    const [httpMethod, setHttpMethod] = useState('get')
    const [body, setBody] = useState('')
    const [headers, setHeaders] = useState([{ chave: "", valor: "" }, { chave: "", valor: "" }])
    const [requestData, setRequestData] = useState({})
    const [requestStatus, setRequestStatus] = useState('Sem status ainda 😢')

    const requestDataDisposition = React.useRef<HTMLInputElement>(null)

    useEffect(
        () => {
            console.log("Createde by Davi Silva Rafacho")
        }, []
    )

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
                console.log()
        }

        return newHeaderObject
    }

    const JsonStyle = {
        propertyStyle: { color: 'blue' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' }
    }

    return (
        <div className="
            w-full min-h-screen h-full
            bg-sky-400 dark:bg-sky-900
            text-white font-sans dark:text-sky-400/75
        ">

            <div className="flex flex-row justify-center pb-5">
                <h1 className="text-5xl font-bold underline mt-5 mb-5">Web Request</h1>
            </div>


            <div className="
                vb:grid vb:grid-cols-8
                md:grid md:grid-cols-8
                so:flex so:flex-col

                px-12 gap-12
            ">

                <div className="vb:col-span-4 md:col-span-3">

                    <div className="vb:grid vb:grid-cols-8 gap-3 mb-10">

                        <div className="
                            vb:col-span-2
                            xl:col-span-2
                            md:col-span-2
                            so:col-span-8
                        "
                        >
                            <label htmlFor="http-verb" className="block font-bold">Método</label>
                            <select id="http-verb" className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded p-2"
                                onChange={event => setHttpMethod(event.target.value)}
                            >
                                <option value="get">GET</option>
                                <option value="post">POST</option>
                                <option value="put">PUT</option>
                                <option value="patch">PATCH</option>
                                <option value="delete">DELETE</option>
                            </select>
                        </div>


                        <div className="vb:col-span-6 so:col-span-8">
                            <label htmlFor="url" className="block font-bold">Url</label>
                            <input id="url" type="text" className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded p-2"
                                value={url}
                                onChange={event => setUrl(event.target.value)}
                            />
                        </div>

                    </div>

                    {
                        httpMethod !== 'get' &&
                        <div className="grid grid-cols-8 gap-3 mb-10">

                            <div className="col-span-8">
                                <label className="font-bold block">Body</label>

                                <textarea name="" id="" cols={51} rows={10} className={Constants.inputPatternClasses} value={body}
                                    onChange={event => setBody(event.target.value)}
                                >
                                </textarea>
                            </div>

                        </div>
                    }

                    <div className="grid grid-cols-8 gap-3 mb-10">
                        <div className="col-span-8">

                            <div className="flex flex-row justify-center pb-5">
                                <h1 className="text-3xl font-bold  mt-5">Headers</h1>
                            </div>
                            <div className="h-64 overflow-auto">

                                {
                                    headers.map(
                                        (header, index) =>
                                            <div key={index} className="vb:grid vb:grid-cols-8 gap-5 so:flex so:flex-col so:p-3"> {/*so:mb-5*/}

                                                <div className="so:col-span-3 ">
                                                    <input type="text" placeholder='Chave' className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded p-2 my-2"
                                                        value={headers[index].chave}
                                                        onChange={
                                                            event => {
                                                                const newHeaders = [...headers]
                                                                newHeaders[index].chave = event.target.value

                                                                setHeaders(newHeaders)
                                                            }
                                                        }
                                                    />
                                                </div>

                                                <div className="col-span-4">
                                                    <input type="text" placeholder='Valor' className="w-full border-2 border-gray-400 py-1 text-zinc-700 rounded p-2 my-2"
                                                        value={headers[index].valor}
                                                        onChange={
                                                            event => {
                                                                const newHeaders = [...headers]
                                                                newHeaders[index].valor = event.target.value

                                                                setHeaders(newHeaders)
                                                            }
                                                        }
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <button
                                                        className={
                                                            index === 0 ?
                                                                "bg-sky-900 dark:bg-sky-800 text-white font-bold py-1 rounded-full mt-2 w-full" :
                                                                "bg-sky-700 dark:bg-sky-700 hover:bg-sky-800 text-white font-bold py-1 rounded-full mt-2 w-full cursor-pointer"

                                                        }
                                                        disabled={index === 0 ? true : false}
                                                        onClick={
                                                            _ => {
                                                                const newHeaders = headers.filter((item: object, index2: number) => index2 !== index)
                                                                setHeaders(newHeaders)
                                                            }
                                                        }
                                                    >
                                                        <b className="fw">X</b>
                                                    </button>
                                                </div>

                                                <div className="border-0 mb-0"></div>

                                            </div>
                                    )
                                }

                            </div>

                            <div className="
                                    vb:flex vb:flex-row
                                    so:flex so:flex-col so:gap-3
                                    pb-5 mt-10 
                            ">
                                <button className="
                                    bg-sky-700 hover:bg-sky-800
                                    border-2 border-sky-900
                                    rounded-3xl vb:p-1 so:p-3
                                    text-white
                                    vb:w-1/3
                                "
                                    onClick={
                                        () => setHeaders([...headers, { chave: "", valor: "" }])
                                    }
                                >Adicionar Header</button>


                                <button className="
                                        bg-sky-700 hover:bg-sky-800
                                        border-2 border-sky-900
                                        rounded-3xl vb:p-1 so:p-3
                                        text-white
                                        vb:w-1/3
                                    "
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

                                            const startThePromise = toast.loading("Processando...")

                                            // @ts-ignore
                                            axios({ method: httpMethod, url, data: body ? JSON.parse(body) : {}, headers: generateHeader(), })
                                                .then(
                                                    res => {
                                                        setRequestData(res.data)
                                                        setRequestStatus(`${res.status}`)

                                                        toast.update(
                                                            startThePromise,
                                                            {
                                                                render: <div><p>A requisição foi um sucesso!</p></div>,
                                                                draggable: true,
                                                                type: "success",
                                                                isLoading: false,
                                                                closeButton: true,
                                                                autoClose: 5000,
                                                                closeOnClick: true,
                                                            }
                                                        )
                                                    }
                                                )
                                                .catch(
                                                    error => {
                                                        setRequestData(error)
                                                        setRequestStatus(`${error.request.status}`)

                                                        toast.update(
                                                            startThePromise,
                                                            {
                                                                render: <div><h1 className="font-bold">Oops...</h1><>Ocorreu um erro na sua requisição</></div>,
                                                                draggable: true,
                                                                type: "error",
                                                                isLoading: false,
                                                                closeButton: true,
                                                                autoClose: 5000,
                                                                closeOnClick: true,
                                                            }
                                                        )
                                                    }
                                                )
                                        }
                                    }
                                >Fazer requisição</button>

                                <button className="bg-sky-700 hover:bg-sky-800 rounded-3xl text-white border-2 border-sky-900 vb:p-1 so:p-3 vb:w-1/3 so:w-full"
                                    onClick={
                                        () => {
                                            setRequestData({})
                                            setRequestStatus('Sem status ainda 😢')

                                        }
                                    }
                                >Zerar o response</button>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="vb:col-span-4 md:col-span-5">

                    <div className="grid grid-cols-8 gap-3 mb-10 mt-6">

                        <div className="col-span-8">
                            <div className="flex flex-row justify-center gap-14">

                                <h5 className={`font-bold text-xl dark:text-white sticky bottom-0 bg-sky-900 dark:bg-sky-700 p-2 rounded`}>Status:
                                    <span className={
                                        requestStatus ?
                                            requestStatus.match(/^2/) ?
                                                'text-lime-400' :
                                                requestStatus.match(/^3/) ?
                                                    'text-yellow-500' :
                                                    requestStatus.match(/^4/) ?
                                                        'text-rose-400' :
                                                        requestStatus.match(/^5/) ?
                                                            'text-rose-600' :
                                                            ''
                                            :

                                            ''
                                    } > {requestStatus}</span>
                                </h5>

                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-8 gap-3 pb-20">

                        <div ref={requestDataDisposition} style={{ minHeight: "520px", maxHeight: "520px", }} className="col-span-8 border-double border-4 border-sky-700 bg-white text-sky-800 overflow-auto">
                            <JsonFormatter json={JSON.stringify(requestData)} tabWith='4' JsonStyle={JsonStyle} />
                        </div>

                    </div>

                </div>

            </div>

            <div className="pl-8 text-white dark:text-indigo-300">
                <p>Created by Davi Silva Rafacho</p>
            </div>

        </div>
    )
}

export default Main
