import React, { useEffect, useState, useCallback, useReducer } from 'react'
import io from 'socket.io-client'
import { useForm } from 'react-hook-form'
import useSWR from 'swr';
var socket = io()
var initialData = [];
const fetcher = (url) => fetch(url).then((res) => res.json())

export default (props) => {
    console.log('props:', props)
    const [text, setText] = useState(initialData)

    const initSocket = (data)=>{
      socket.on('connect', () => {
            console.log('connect')
            setText(data)
          })
      
          socket.on('hello', data => {
            setText([...data, data])
          })
      
          socket.on('data', data =>{
            setText([...data, data])
          })
      
          socket.on('a user connected', () => {
            console.log('a user connected')
          })
          
          socket.on('new', (data) => {
            data = [...data, data]
            setText(data)
          })
      
          socket.on('disconnect', () => {
            console.log('disconnect')
          })
    }

    useEffect(()=>{
      async function getFetch(path, callback){
        fetch(path).then(res => res.json().then(data=> ({
          data: data,
          status: res.status
        }))).then(res=> {
          callback(res)
        })
      }

      getFetch('/api/socket', (res)=>{
        console.log('imhere3')
        var data = res.data;
        
        // initialData => ([...initialData, ...data])
        // console.log('initialData:', initialData)

        // setText(initialData = [...initialData, ...data])
        // const final = initialData = [...initialData, ...data];
        setText(["a"])
        // fn(final)
      
        // initSocket()  ;
      })
    }, [])

  const {register, handleSubmit} = useForm();
  const onSubmit = (d) =>{
    // fetch('api/socket', {method: "POST", body: JSON.stringify(d)})
    socket.emit('new', d.message)
  }

  const parse = (target)=>{
    var result = target;
    try{
      result = JSON.parse(target).msg
    }catch(ex){

    }

    if(!text) return;
    return result;
  }

  console.log('text:', text)
  
  return (
      <React.Fragment>
        <h1>Socket.io</h1>
        <div key="author">
            {text && text.map((x)=> {
                const msg = parse(x)
                console.log('msg:', msg)
                return (<ol>{msg}</ol>);
            })}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("message")}></input>
            <input type="submit" value="submit" />
        </form>
      </React.Fragment>
  )
}

