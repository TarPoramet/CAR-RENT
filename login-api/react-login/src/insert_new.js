// import React, { useState } from "react";
import axios from 'axios';
import React , {useState, useEffect}from 'react';
//import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Insertproduct() {
    const [productName, setProductName] = useState("");
    const [addPrice, setPrice] = useState(""); // Corrected variable name
    const [file, setFile] = useState(null);
  
    const handleUpload = async (e) => {
      e.preventDefault();
      if (!file || !productName || !addPrice) return; // Corrected variable name
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        try {
          await axios.post('http://localhost:3333/uploadnew', { 
            productName: productName,
            price: addPrice,
            imageData: base64Data
          });
          alert('Upload success!');
          window.location = '/manageproduct';
        } catch (error) {
          console.error('Upload failed:', error);
        }
      };
    };

  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ShoppingCartIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADD PRODUCT
          </Typography>
          <Box component="form" noValidate onSubmit={handleUpload} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder='Enter Name'
                    autoComplete='off'
                    onChange={(e) => setProductName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  className="form-control"
                  id="addPrice"
                  placeholder='Enter Price'
                  autoComplete='off'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD
            </Button>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}

export default Insertproduct;