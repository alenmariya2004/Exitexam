import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
    const { id } = useParams();

  var [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    if (id) {
      axios.get("http://localhost:3001/get")
        .then((res) => {
          const blog = res.data.find((b) => b._id === id);
          if (blog) {
            setInputs({
              title: blog.title,
              content: blog.content,
              img_url: blog.img_url
            });
          }
        })
        .catch((err) => console.error("Failed to load blog", err));
    }
  }, [id]);
   const addData = () => {
    if (id) {
      axios.put(`http://localhost:3001/${id}`, inputs)
        .then(() => {
          alert("Blog updated!");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert("Blog added!");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const inputHandler = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("in",inputs);
  };
 
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Title"
              onChange={inputHandler}
              name="title"
              value={inputs.title}
              fullWidth
            />
            <TextField
              variant="outlined"
              placeholder="content"
              onChange={inputHandler}
              name="content"
              value={inputs.content}
              multiline={4}
            />
            <TextField
              variant="outlined"
              placeholder="image url"
              onChange={inputHandler}
              name="img_url"
              value={inputs.img_url}
            />

            <Button variant="contained" color="secondary" onClick={addData}>
              Submit
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Add;
