import React from 'react';
import styled from '@emotion/styled';


const Navbar = styled('nav')(() => ({
  zIndex:'1000',
  color: '#fff',
  width: '100%'
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    
    // following style elements are used to make navbar sticky 

    <div style={{
      display : 'flex',
      backgroundColor: '#333',
      position : 'sticky',
        top: '0px',
  zIndex:'1000',

    }}>
      <Navbar>
        <ul style={{}}>
          <ListItem>
            <Link href={'/'}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={'/users'}>Users</Link>
          </ListItem>
        </ul>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
