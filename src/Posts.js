import React, { useEffect, useState, Fragment } from 'react';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Pagination, Stack, Chip, Button } from '@mui/material'
import './App.css';

const postsPerPage = 10;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const [tagsList, setTagList] = useState([]);
  const [filteredByTag, setFilteredByTag] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetch('https://dummyjson.com/posts');
      const { posts } = await data.json();
      setPosts(posts);
      setMaxPage(Math.ceil(posts.length / postsPerPage));
      setCurrentPagePosts(posts.slice(0, postsPerPage));
      const tagsList = posts.reduce((acc, post) => {
        return [...acc, ...post.tags]
      }, []);
      const uniqTagsList = [...new Set(tagsList)];
      setTagList(uniqTagsList)
    })();
  }, []);

  const handlePageChange = (e, value) => {
    const currPage = value;
    setCurrentPage(currPage)
    const prevPostLastCount = (currPage - 1) * 10;
    setCurrentPagePosts(posts.slice(prevPostLastCount, prevPostLastCount + postsPerPage))
  }

  const handleTagClick = (tag) => {
    setFilteredByTag(tag)
    const currPosts  = posts.filter(post => post.tags.includes(tag))
    setCurrentPagePosts(currPosts)
  }

  const resetFilter  = () => {
    setFilteredByTag('')
  }

  return (
    <div className="App">
      Filter posts by tags: 
      {
        tagsList.map((tag) => <Fragment>
          <Chip key={tag} label={tag} variant={filteredByTag === tag ? 'filled' : 'outlined' } onClick={()=>handleTagClick(tag)} />
        </Fragment>)
      }
      <Button variant="contained" onClick={resetFilter}>Reset Fiter</Button>
      {
        filteredByTag==='' && <Stack spacing={2}>
        <Pagination count={maxPage} page={currentPage} size="large" onChange={handlePageChange} />
      </Stack>
      }
      {
        currentPagePosts.map(({ id, title, body, userId, reactions, tags }) => {
          return <Card key={`${id}`} sx={{ maxWidth: 1044 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
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
              {
                tags.map((tag) => <IconButton key={tag}>
                  #{tag}
                </IconButton>)
              }
            </CardActions>

          </Card>
        })
      }
    </div>
  );
}

export default Posts;