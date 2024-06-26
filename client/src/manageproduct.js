import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import topleftImage from './img/topleft.jpg';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(process.env.REACT_APP_API +'/showproducts'); // เรียก API Endpoint ที่ดึงข้อมูลสินค้า
        setProducts(response.data); // ตั้งค่า state ของสินค้าด้วยข้อมูลที่ได้รับ
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
    window.location = '/login'
  }
  const ProductEdit = (id) => {
    window.location = '/editproduct/' + id;
  };

  const ProductDelete = (id) => {
    Swal.fire({
      title: "Confirm Delete",
      text: "Do you want to delete",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Confirm !"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(process.env.REACT_APP_API +`/deleteproduct/${id}`)
          .then(response => {
            console.log("Delete Response:", response.data);
            if (response.data.status === 'ok') {
              Swal.fire({
                title: "Success",
                icon: "success",
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location = '/manageproduct';
                }
              });

            } else {
              alert("Error deleting product787878");
            }

          })
          .catch(error => {
            console.error('Error deleting product5678:', error);
          });

      }
    });
    
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" style={{ backgroundColor: "white" }} >
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/manageproduct">
                <img src={topleftImage} style={{ marginRight: '2px', width: '50px', height: '50px' }} alt="Logo" />
              </Link>
              <Typography variant="h6" color="black" noWrap style={{ marginLeft: '10px' }}>
                <b>CAR RENT</b>
              </Typography>
            </div>

          <Button variant="contained" color='error' onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography align="center">
              <h1>ADMIN PAGE</h1>
            </Typography>
          </Container>
          <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography align="center">
              <Button size="small" variant="contained" onClick={() => window.location = '/insert_new'}>
                ADD CAR
              </Button>
            </Typography>
          </Container>

        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  className="hoverCard" // เพิ่มคลาสเพื่อใช้ CSS สำหรับ hover effect
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '50%',
                      backgroundSize: 'cover',
                      transition: 'transform 0.3s ease-in-out', // เพิ่ม transition effect
                      '&:hover': {
                        transform: 'scale(1.1)', // เมื่อ hover ขยายขนาด 110%
                      },
                    }}
                    image={`data:image/png;base64, ${product.img}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* <Typography gutterBottom variant="h5" component="h2" sx={{ fontSize: '1.5rem' }}>
                  {product.product_name}
                </Typography> */}
                    <Typography>{product.product_name}</Typography>


                    <Typography style={{ marginTop: '10px' }}><b>price: {product.price.toLocaleString()} Bath / Day</b></Typography>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => ProductEdit(product.product_id)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        size="small"
                        variant="contained"
                        onClick={() => ProductDelete(product.product_id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}