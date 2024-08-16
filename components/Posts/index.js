import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
//import useWindowWidth from '../hooks/useWindowWidth';
//importing context api
import { useWindowWidthContext } from '../context/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // using context api
  const { isSmallerDevice } = useWindowWidthContext();
  const [limit, setlimit] = useState(isSmallerDevice ? 5 : 10);




  

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const { data: posts } = await axios.get('/api/v1/posts', {
        params : { start: 0, limit: limit },
      });
      setPosts(posts);
      setIsLoading(false);
      setlimit(isSmallerDevice ? limit+5 : limit+10);

    };

    fetchPost();
  }, [isSmallerDevice]);


  const handleClick = () => {
 
    const fetchPost = async () => {
      setIsLoading(true);
      const { data: posts } = await axios.get('/api/v1/posts', {
        params : { start: 0, limit: limit },
      });
      setPosts(posts);
      setIsLoading(false);
      setlimit(isSmallerDevice ? limit+5 : limit+10);
    };
  
      fetchPost();
    
  };


  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading || (limit>=110)}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>
    </Container>
  );
}
