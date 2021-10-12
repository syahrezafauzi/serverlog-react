import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useForm } from 'react-hook-form'
var socket = io()

export default () => {
    const [text, setText] = useState(["coba"])
  useEffect(() => {
      
    fetch('/api/socket').finally(() => {
        socket = io()
      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('hello', data => {
        console.log('hello', data)
        console.log('data:', data)
        setText([...text, data])
      })

      socket.on('a user connected', () => {
        console.log('a user connected')
      })
      
      socket.on('new', (data) => {
        setText([...text, data])
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  const {register, handleSubmit} = useForm();
  const onSubmit = (d) =>{
    // fetch('api/socket', {method: "POST", body: JSON.stringify(d)})
    socket.emit('new', d.message)
  }
  
  return (
      <React.Fragment>
        <h1>Socket.io</h1>
        <div key="author">
            {text && text.map((x)=> {
                return (<ol>{x}</ol>);
            })}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("message")}></input>
            <input type="submit" value="submit" />
        </form>
      </React.Fragment>
  )
}