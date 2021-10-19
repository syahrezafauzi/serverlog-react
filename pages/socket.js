import {Box, Grid, Container, Typography, Paper, List, ListItem, ListItemText, Divider, ListItemIcon, Icon, Chip} from '@mui/material'
import React, { useEffect, useState, useCallback, useReducer } from 'react'
import FolderIcon from '@mui/icons-material/Inbox';
import io from 'socket.io-client'
import { useForm } from 'react-hook-form'
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons'
var socket = io()
var initialData = [];
const fetcher = (url) => fetch(url).then((res) => res.json())
var isScrollToBottom = true;

export default (props) => {
    // console.log('props:', props)
    const [text, setText] = useState(initialData)
    // console.log('initialData:', initialData)
    const populate = (data) =>{
      // console.log('onpopulate')
      // console.log('data:', data)
      if(typeof(data) == 'string') {
        // console.log('populatestring')
        setText(initialData = [...initialData, data])
      }
      else {
        // console.log('populatelese')
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
        // console.log('data new:', data)
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
          // console.log('imhere3')
          // console.log('data:', data)
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
    fetch('api/socket', {method: "POST", body: d.message})
    // socket.emit('new', d.message)
  }

  const parse = (target, key)=>{
    var result = null;
    try{
      result = JSON.parse(target)[key]
    }catch(ex){
    }

    return result;
  }

  // console.log('text:', text)
  
  return Page(text, handleSubmit, onSubmit, register, parse)
}

const Page = (text, handleSubmit, onSubmit, register, parse)=>{
  const count = text && text.length;
  const [lastElement, setLastElement] = useState(null)
  useEffect(()=>{
    lastElement && lastElement.scrollIntoView({ behaviour: "smooth" });
  }, [lastElement])

  return (
    <React.Fragment>
      <Box 
       style={{backgroundColor: 'black'}}
      height="100vh" display="flex" flexDirection="column"
      alignItems='center'>
        <Box sx={{height: '5%'}}></Box>
          <Container  maxWidth="lg"
           sx={{height: '90%'}}
          //  style={{backgroundColor: 'red'}}
           >

          <Grid justify="center" color="#aaffcc">
            
            <Typography color="#ffaabb" variant="h3">Application Log Server</Typography>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("message")}></input>
                <input type="submit" value="submit" />
            </form>
          </Grid>
          <Grid sx={{height: '90%'}}>
            <List sx={{height: '100%', overflow: 'auto'}}
            onScroll={(event)=>{
              // console.log('event.target.scrollTop:', event.target.scrollTop)
              // console.log('event.target.scrollHeight:', event.target.scrollHeight)
              // console.log('event.target.clientHeight:', event.target.clientHeight)
              if(event.target.scrollTop == (event.target.scrollHeight - event.target.clientHeight)){
                isScrollToBottom = true;
              }else isScrollToBottom = false;
            }}
             ref={(el)=> {
                // console.log('el:', el)
                // setLastElement(el)
              }}>
              {text && text.map((x, i)=> {
                  var msg = x;
                  var time= "-";
                  var even = (i % 2) == 0;
                  try{
                    // console.log('x:', x)
                    var _parse = parse(x, "msg")
                    time = parse(x, "time")
                    // console.log('_parse:', _parse)
                    if(_parse) msg = _parse
                  }catch(ex){
                    console.log(ex && ex.message)
                  }
                  // console.log('msg:', msg)
                  // console.log('msg:', msg ? x : msg)
                  return (
                    <Box 
                    bgcolor={even ? '#000000' : '#101000'}
                    ref={(el)=>{
                      if((i+1) == count){
                        if(isScrollToBottom) setLastElement(el)
                      }
                    }}>
                    <ListItem>
                    <ListItemIcon>
                    <FontAwesomeIcon color='gray' icon={faInfo} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography style={{ color: "gray" }}>
                          {time}
                        </Typography>
                      }
                      secondary={
                        <Typography style={{ color: "white" }}>{msg}</Typography>
                      }
                    />
                    </ListItem>
                    <Divider sx={{backgroundColor: 'gray'}} />
                    </Box>
                  );
              })}
            </List>
          </Grid>
        </Container>
        <Box sx={{height: '5%'}}></Box>
      </Box>
      
      
      
    </React.Fragment>
  )
}

