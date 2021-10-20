import Page from '../ui/log'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

var socket = io()
var initialData = [];

export default function Home() {
  const [text, setText] = useState(initialData)
  const populate = (data) => {
    if (typeof (data) == 'string') {
      setText(initialData = [...initialData, data])
    } else {
      setText(initialData = [...initialData, ...data])
    }
  }

  const initSocket = (onConnect) => {
    socket.on('connect', () => {
      onConnect();
    })

    socket.on('a user connected', () => {
      console.log('a user connected')
    })

    socket.on('public', (data) => {
      populate(data)
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
    })
  }


  const onSubmit = (d) => {
    fetch('api', {
      method: "POST",
      body: d.message
    })
  }

  useEffect(() => {
    async function getFetch(path, callback) {
      fetch(path).then(res => res.json().then(data => ({
        data: data,
        status: res.status
      }))).then(res => {
        callback(res)
      })
    }

    initSocket(() => {
      getFetch('/api', (res) => {
        var data = res.data;
        setText(initialData = [...initialData, ...data])
      })
    });

  }, [])
  return Page(text, onSubmit)
}
