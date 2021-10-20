import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import {Box, Grid, Container, Typography, Paper, List, ListItem, ListItemText, Divider, ListItemIcon, Icon, Chip} from
'@mui/material'
import { useForm } from 'react-hook-form'

var isScrollToBottom = true;

const Page = (texts, onSubmit)=>{
const count = texts && texts.length;
const [lastElement, setLastElement] = useState(null)
const {register, handleSubmit} = useForm();
const parse = (target, key) => {
var result = null;
try {
result = JSON.parse(target)[key]
} catch (ex) {}

return result;
}


useEffect(()=>{
lastElement && lastElement.scrollIntoView({ behaviour: "smooth" });
}, [lastElement])

return (
<React.Fragment>
    <Box style={{backgroundColor: 'black'}} height="100vh" display="flex" flexDirection="column" alignItems='center'>
        <Box sx={{height: '5%'}}></Box>
        <Container maxWidth="lg" sx={{height: '90%'}}>

            <Grid justify="center" color="#aaffcc">

                <Typography color="#ffaabb" variant="h3">Application Log Server</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("message")}></input>
                    <input type="submit" value="submit" />
                </form>
            </Grid>
            <Grid sx={{height: '90%'}}>
                <List sx={{height: '100%', overflow: 'auto'}} onScroll={(event)=>{
                    if(event.target.scrollTop == (event.target.scrollHeight - event.target.clientHeight)){
                    isScrollToBottom = true;
                    }else isScrollToBottom = false;
                    }}
                    ref={(el)=> {
                    }}>
                    {texts && texts.map((x, i)=> {
                    var msg = x;
                    var time= "-";
                    var even = (i % 2) == 0;
                    try{
                    var _parse = parse(x, "msg")
                    time = parse(x, "time")
                    if(_parse) msg = _parse
                    }catch(ex){
                    console.log(ex && ex.message)
                    }
                    return (
                    <Box bgcolor={even ? '#000000' : '#101000' } ref={(el)=>{
                        if((i+1) == count){
                        if(isScrollToBottom) setLastElement(el)
                        }
                        }}>
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color='gray' icon={faInfo} />
                            </ListItemIcon>
                            <ListItemText primary={ <Typography style={{ color: "gray" }}>
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

export default Page;