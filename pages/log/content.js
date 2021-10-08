import useSWR from 'swr';
import { useState, useEffect } from 'react';

export default function App() {
    const [data2, setData2] = useState({})
    const url =
        "/api/log"

    // var source = new EventSource('/api/log',  { withCredentials: true });
    // // console.log('Received', source)
    // source.onmessage =  e=> console.log(e)

    console.log('data2:', data2)
    useEffect(() => {
        console.log('imhere')
        let eventSource = new EventSource("/api/log")
        // eventSource.onmessage = event => updateLogs((event.data))
        eventSource.onmessage = (e)=>{
            setData2(e.data)
        }
        eventSource.onopen = (e)=>{
            console.log('apa')
        }
        eventSource.addEventListener('newEntry', e =>
          updateLogs(e.data)
        )
        eventSource.addEventListener('close', () =>
          eventSource.close()
        )
    
        return (() => eventSource.close() )
      }, [])

    // const { data, error } = useSWR(url, fetcher)
    // console.log('data:', data)
    // console.log('data2:', data2)

    // if (error) {
    //     console.log('error:', error)

    //     return <div>failed to load, {error.message}</div>
    // }
    // if (!data) return <div>loading...</div>

    
    return (
        
        <div className="App">
            {
                data2
                // data.on("data", (x) => console.log(x))
                // fetch(data).then(function(response){
                //     console.log('response:', response)
                    
                // })
                // data.on('data', (chunk)=>{
                //     console.log(chunk)
                // })
            }
            {/* {JSON.stringify(data)} */}
        </div>
    )
}

const fetcher = (url) => fetch(url).then((res) => {
    // var readable = res.body;
    // debugger
    return res.body;
})
