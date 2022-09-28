import { useState, useEffect } from "react";
import REQUEST_OPTIONS from '../utils/requestOptions'
import StreamHandle from '../utils/streamHandle'
import { dataType } from '../utils/dataGroup'
import { Encode } from '../utils/encode'

type RequestType = 'GET'
type FetchParams = {
    page_now: number,
    page_size: number
}
type pageType = {
    page_now?: number,
    page_size?: number,
    page_total?: number,
    total_num?: number
}
type Response = {
    list: dataType[]
    page: pageType
}

/**
 * 
 * @param url 
 * @param type 
 * @param params 
 * @returns 
 */
const useFetch = (url: string, type: RequestType, params: FetchParams): [Response, boolean, any] => {
    const [response, setResponse] = useState<Response>({list: [], page: {}})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    const postData = async (signal: AbortSignal) => {
        try {
            const response = await fetch(REQUEST_OPTIONS[type](url, params) as string, { signal });
            const body = response.body;
            const reader = await StreamHandle(body)
            const { code, data, msg } = Encode(reader);
            if (code === 0) {
                setResponse(data)
            } else {
                setError(msg);
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        const controller = new AbortController()
        const signal = controller.signal
        postData(signal)
        return () => {
            controller.abort()
            setLoading(false)
            setError(null)
        }
    }, [url])

    return [response, loading, error]
}

export default useFetch