//Create the Home UI for the BlogAPP(Cards are preferrred; You may choose your UI preference )
//Write your code here
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this blog?")) {
    axios.delete(`http://localhost:3001/${id}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id)); 
      })
      .catch(err => console.error("Delete failed", err));
  }
};

const navigate = useNavigate();
  return (
    <div style={{
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  paddingTop:100
     }}>
          <Grid container spacing={2} justifyContent="center" sx={{ padding: 2 }}>
      {blogs.map((blogs, index) => (
        <Grid item key={index}>
        <Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia 
          component="img"
          height="100"
          image={blogs.img_url|| "https://via.placeholder.com/300x100.png?text=No+Image"}
          
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {blogs.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {blogs.content}
          </Typography>
          <Button variant="contained" color="secondary"  sx={{ mt: 1, mr: 1 }}
           onClick={() => handleDelete(blogs._id)}>Delete</Button>
          <Button variant="contained" color="secondary"sx={{mt:1,mr:1}} onClick={() => navigate(`/add/${blogs._id}`)}>Update</Button>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
      ))}
    </Grid>
    </div>
  )
}

export default Home
