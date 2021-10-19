import React, { useEffect, useState, useCallback, useReducer } from 'react'
import io from 'socket.io-client'
import { useForm } from 'react-hook-form'
import useSWR from 'swr';
var socket = io()
var initialData = [];
const fetcher = (url) => fetch(url).then((res) => res.json())

export default (props) => {
    // console.log('props:', props)
    const [text, setText] = useState(initialData)
    console.log('initialData:', initialData)
    const populate = (data) =>{
      console.log('onpopulate')
      console.log('data:', data)
      if(typeof(data) == 'string') {
        console.log('populatestring')
        setText(initialData = [...initialData, data])
      }
      else {
        console.log('populatelese')
        setText(initialData = [...initialData, ...data])
      }
    }

    const initSocket = (onConnect)=>{
      socket.on('connect', () => {
            // console.log('connect')
            // setText(data)
            onConnect();
      })
      
      socket.on('hello', data => {
        populate(data)
      })
  
      socket.on('data', data =>{
        populate(data)
      })
  
      socket.on('a user connected', () => {
        console.log('a user connected')
      })
      
      socket.on('new', (data) => {
        console.log('data new:', data)
        populate(data)
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

      initSocket(()=>{
        getFetch('/api/socket', (res)=>{
          console.log('imhere3')
          console.log('data:', data)
          var data = res.data;
          
          // initialData => ([...initialData, ...data])
          // console.log('initialData:', initialData)
  
          setText(initialData = [...initialData, ...data])
          // const final = initialData = [...initialData, ...data];
          // setText(["a"])
        })
      });
      
    }, [])

  const {register, handleSubmit} = useForm();
  const onSubmit = (d) =>{
    fetch('api/socket', {method: "POST", body: JSON.stringify(d.message)})
    // socket.emit('new', d.message)
  }

  const parse = (target)=>{
    var result = null;
    try{
      result = JSON.parse(target).msg
    }catch(ex){
    }

    return result;
  }

  // console.log('text:', text)
  
  return (
      <React.Fragment>
        <h1>Socket.io</h1>
        <div key="author">
            {text && text.map((x)=> {
                var msg = x;
                try{
                  // console.log('x:', x)
                  var _parse = parse(x)
                  // console.log('_parse:', _parse)
                  if(_parse) msg = _parse
                }catch(ex){
                  console.log(ex && ex.message)
                }
                console.log('msg:', msg)
                // console.log('msg:', msg ? x : msg)
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

