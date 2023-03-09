import React, { useEffect, useState } from 'react';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card,CardHeader,CardContent,CardActions,Avatar,IconButton,Typography,Pagination } from '@mui/material'


const Posts=()=>{

const [posts,setPosts]=useState([]);

useEffect(()=>{
    (async()=>{
        const data = await fetch('https://dummyjson.com/posts');
        const {posts}=await data.json();
        setPosts(posts);
    })();
});


    return(
        <div>
            {
        posts.map(({id, title, body, userId, reactions})=> {
          return <Card key={`${id}`} sx={{ maxWidth: 1044 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userId}
            </Avatar>
            }
            action={
              <IconButton aria-label="settings">
              </IconButton>
            }
            title={title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {body}
          </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon /> {reactions}
            </IconButton>
          </CardActions>
  
        </Card>
        })
      }
        </div>
    )
}
export default Posts;