import React , {useState, useEffect}from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';
// import { ThemeProvider } from '@emotion/react';
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Container from '@mui/material/Container';
// import topleftImage from './img/topleft.jpg';
// import ImageSlider from './ImageSlider';
// import home1 from './img/home-1.jpg';
import home3 from './img/home-3.jpg';
// import product1 from './img/product/heeyai.png'
// import product from './img/product/heeyai.png'
//import Product from './img/product/heeyai.png'

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// export default function Album() {
//   useEffect(() => {
//     const token = localStorage.getItem('token')

//     fetch("http://localhost:3333/authen", {
//       method: "POST", 
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer '+token
//       },

//     })

//     .then(response => response.json())
//     .then(data => {
//         console.log("Success:", data);
//         if (data.status === 'ok'){
//             //alert('Authen Success')
//         }else{
//             alert('Authen Failed')
//             localStorage.removeItem('token');
//             window.location = '/'
//         }
//     })
//     .catch((error) => {
//         console.error('Error : ',error);
//     });
//   },[])

//   const handleLogout = (event) => {
//     event.preventDefault();
//     localStorage.removeItem('token');
//     window.location = '/login'
//   }
export default function Album() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Authentication check
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication failed. Redirecting to login.');
      window.location = '/';
      return;
    }

    // Fetch authentication status
    fetch("http://localhost:3333/authen", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Authentication Response:", data);
        if (data.status === 'ok') {
          // Authentication success, proceed to fetch product data
          fetch("http://localhost:3333/showproduct", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          })
            .then(response => response.json())
            .then(productData => {
              console.log("Product Data:", productData);
              setProducts(productData.products);
            })
            .catch(error => {
              console.error('Error fetching product data:', error);
            });
        } else {
          alert('Authentication failed. Redirecting to login.');
          localStorage.removeItem('token');
          window.location = '/';
        }
      })
      .catch(error => {
        console.error('Authentication Error:', error);
      });
  }, []);



  return (

    <div>
      <h1>Product List</h1>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.product_name} - {product.price}</h3>
          <h3>{product.product_detail}  </h3>
          {/* <h3>{product.img}  </h3> */}
          <img src={require(`${product.img}`)} style={{ width: '100%' }} />
        </div>
      ))}
    </div>
    
  );
}
    
    // <ThemeProvider theme={defaultTheme}>
    //   <CssBaseline />
    //   <AppBar position="relative" style={{ backgroundColor: 'white' }}> 
    //     <Toolbar>
          
    //     {/* <img src={topleftImage} style={{ marginRight: '2px' ,width: 'auto', height: '50px'}} />
    //     <Typography variant="h6" color="black" style={{ marginLeft: '20px' }} noWrap>
    //       <b>Thai-Denmark</b>
    //     </Typography> */}
    //       <img src={topleftImage} alt="Logo" style={{ marginRight: '2px', width: 'auto', height: '50px' }} />
    //       <Typography variant="h6" color="textPrimary" style={{ marginLeft: '20px' }} noWrap>
    //         <b>Thai-Denmark</b>
    //       </Typography>

          
    //       <Button variant="outlined" color='error' onClick={handleLogout} style={{ marginLeft: 'auto' }}>Log out</Button>
    //     </Toolbar>
    //   </AppBar>
    //   <main>
    //     {/* Hero unit */}
    //     <Box
    //       sx={{
    //         bgcolor: 'background.paper',
    //         pt: 8,
    //         pb: 6,
    //       }}
    //     >
          
    //       <Container>
    //         <Typography
    //           component="h1"
    //           variant="h2"
    //           align="center"
    //           color="text.primary"
    //           gutterBottom
    //         >
              
    //         </Typography>
    //         {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
    //           Something short and leading about the collection below—its contents,
    //           the creator, etc. Make it short and sweet, but not too short so folks
    //           don&apos;t simply skip over it entirely.
    //         </Typography>  */}
            
    //         <Stack
    //           sx={{ pt: 4 }}
    //           direction="row"
    //           spacing={2}
    //           justifyContent="center"
    //         >
              
              
    //         </Stack>
    //         <img src={home1} style={{ display: 'block', margin: 'auto', width: 'auto', height: '400px' }} />

    //       </Container>

    //     </Box>
        
    //     <Container sx={{ py: 8 }} maxWidth="md">
    //       <Grid container spacing={2} sx={{ flexWrap: 'nowrap' , marginTop: 0 }}>
            

    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product1}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //                 โยเกิร์ตพร้อมดื่ม U.H.T รสมะนาว ขนาด 200*36 กล่อง/ลัง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 349.00</b></span>
    //                 <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>

    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>

    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product2}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //               ผลิตภัณฑ์นม ยูเอชที รสจืด โอเมก้าพลัส 180 มล. 36 กล่อง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 413.00</b></span>
    //                  <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>
    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>

    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product1}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //                 โยเกิร์ตพร้อมดื่ม U.H.T รสมะนาว ขนาด 200*36 กล่อง/ลัง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 349.00</b></span>
    //                  <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>
    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>


    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product1}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //                 โยเกิร์ตพร้อมดื่ม U.H.T รสมะนาว ขนาด 200*36 กล่อง/ลัง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 349.00</b></span>
    //                  <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>
    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>


    //       </Grid>

          

    //       <Grid container spacing={2} sx={{ flexWrap: 'nowrap' , marginTop: 2}}>
            

    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product1}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //                 โยเกิร์ตพร้อมดื่ม U.H.T รสมะนาว ขนาด 200*36 กล่อง/ลัง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 349.00</b></span>
    //                  <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>
    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>

    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product2}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //               ผลิตภัณฑ์นม ยูเอชที รสจืด โอเมก้าพลัส 180 มล. 36 กล่อง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 413.00</b></span>
    //                  <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>
    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>

    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product1}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //                 โยเกิร์ตพร้อมดื่ม U.H.T รสมะนาว ขนาด 200*36 กล่อง/ลัง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 349.00</b></span>
    //                  <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>
    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>


    //         <Grid item xs={12} sm={6} md={4}>
    //           <Card
    //             sx={{
    //               height: 'auto',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               width: '200px',
    //               maxWidth: '100%',
    //               flex: '0 0 auto',
    //             }}
    //           >
    //             <CardMedia
    //               component="div"
    //               sx={{
    //                 pt: '100%', // ยืดให้ความสูงเท่ากับความกว้าง
    //                 backgroundSize: 'cover', // ปรับขนาดภาพให้เต็มพื้นที่
    //               }}
    //               image={product1}
    //             />

    //             <CardContent sx={{ flexGrow: 1 }}>
    //               <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
    //                 โยเกิร์ตพร้อมดื่ม U.H.T รสมะนาว ขนาด 200*36 กล่อง/ลัง
    //               </Typography>
    //               <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <span color="black"><b>฿ 349.00</b></span>
    //                  <Button variant="outlined" size="small" sx={{ fontSize: '0.7rem' }}>add to cart</Button>
    //               </Typography>

    //             </CardContent>
                
    //           </Card>
    //         </Grid>


    //       </Grid>
    //     </Container>

    //   </main>
    //   {/* Footer */}
    //   <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
    //     <Typography variant="h6" align="center" gutterBottom>
    //       Footer
    //     </Typography>
    //     <Typography
    //       variant="subtitle1"
    //       align="center"
    //       color="text.secondary"
    //       component="p"
    //     >
    //       Something here to give the footer a purpose!
    //     </Typography>
    //     <Copyright />
    //   </Box>
    //   {/* End footer */}
    // </ThemeProvider>

