import React, { useEffect, useState } from "react";
import { API } from "../../../service/api";
import { Box, Grid } from "@mui/material";
import Post from "./Post";
import { useSearchParams, Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" });
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);
  return (
    <>
      <Grid container>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Grid item lg={3} sm={6} xs={12}>
              <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                <Post post={post} />
              </Link>
            </Grid>
          ))
        ) : (
          <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
            No Data available
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Posts;
