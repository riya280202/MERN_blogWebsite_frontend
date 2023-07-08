import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import { Delete, Edit } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import Comments from "./Comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const DetailView = () => {
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    await API.deletePost(post._id);
    navigate("/");
  };

  return (
    <Container>
      <Image src={url} alt="blog" />

      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>

            <DeleteIcon color="error" onClick={() => deleteBlog()} />
          </>
        )}
      </Box>

      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>

      <Typography>{post.description}</Typography>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
