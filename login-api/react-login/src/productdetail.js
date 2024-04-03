import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import topleftImage from './img/topleft.jpg';
import home1 from './img/home-1.jpg';


const defaultTheme = createTheme();
const ProductDetailContainer = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  

  useEffect(() => {
    // Fetch product detail based on the ID
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication failed. Redirecting to login.');
      window.location = '/';
      return;
    }

    fetch(`http://localhost:3333/productdetail/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Product Detail Data:", data);

        if (data.status === 'ok') {
          setProductDetail(data.productDetail);
        } else {
          alert("Error fetching product detail");
        }
      })
      .catch(error => {
        console.error('Error fetching product detail:', error);
      });
  }, [id]);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }
  

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" style={{ backgroundColor: "white" }} >
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <img
            src={topleftImage}

            style={{ marginRight: '2px', width: '50px', height: '50px' }}
          />
          <Typography variant="h6" color="black" noWrap style={{ marginLeft: '10px' }}>
            <b>Thai-Denmark</b>
          </Typography>
          
          <Button variant="contained" color='error' onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <main>

        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  alt={productDetail.product_name}
                  height="auto"
                  image={require(`${productDetail.img}`)}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">{productDetail.product_name}</Typography>
              <Typography variant="h6" color="textSecondary">
                Price: {productDetail.price.toLocaleString()} Bath
              </Typography>
              <Typography variant="body1">{productDetail.product_detail}</Typography>
              
            </Grid>
          </Grid>
        </Container></main>
    </ThemeProvider>
  );
};

export default ProductDetailContainer;
