import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import topleftImage from './img/topleft.jpg';
import home1 from './img/home-1.jpg';

function Album() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3333/showproducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location = '/login';
  };
  const Cardetail = (id) => {
    window.location = '/car_detail/' + id;
  }


  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/home">
                <img src={topleftImage} style={{ marginRight: '2px', width: '50px', height: '50px' }} alt="Logo" />
              </Link>
              <Typography variant="h6" color="black" noWrap style={{ marginLeft: '10px' }}>
                <b>CAR RENT</b>
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="text" style={{ marginRight: '10px' }}>History</Button>
              <Button variant="contained" color='error' onClick={handleLogout}>Log out</Button>
            </div>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <main>
          <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
            <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography align="center">
                <img src={home1} style={{ height: '400px', width: 'auto' }} alt="Home Image" />
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 6 }} maxWidth="md">
            <Grid container spacing={4} >
              {products.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={6} >
                  <Card className="hoverCard" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '50%',
                        backgroundSize: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                      image={`data:image/png;base64, ${product.img}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography><b style={{ color: 'red', fontSize: "20px" }}>{product.product_name}</b></Typography>
                      <Typography style={{ marginTop: '10px' }}><b>Price: {product.price.toLocaleString()} Bath / Day</b></Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <div></div>
                      <Button size="big" variant="contained" color="error" onClick={() => Cardetail(product.product_id)}>
                        view
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

        </main>
      </Box>
    </ThemeProvider >
  );
}

export default Album;
