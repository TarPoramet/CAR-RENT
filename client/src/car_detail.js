import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'


import topleftImage from './img/topleft.jpg';

function Cardetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [totalprice, setTotaiprice] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(process.env.REACT_APP_API +`/showproductfromid/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product detail:', error);
      });
  }, [id]);

  const handlePriceChange = (e) => {
    const newQuantityday = parseInt(e.target.value);
    setQuantity(newQuantityday);
    const totalPrice = product.price * newQuantityday;
    setTotaiprice(totalPrice);
    
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (totalprice === 0) {
      // alert("Choose Day")
      Swal.fire({
        title: "Choose Day !!!",
        text : "please choose day",
        icon: "error",
        confirmButtonText: 'OK'
      })
    }
    else{
      try {
        await axios.post(process.env.REACT_APP_API +'/upbooking', { 
          quantity: quantity,
          totalprice: totalprice,
          car_id: id,
          user_id: userId
        });
        Swal.fire({
          title: "Confirm Booking",
          text : "Booking car   "+ product.product_name + " for  "+ quantity +"  Day",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm !"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = '/home';
          }
        });

      } catch (error) {
        console.error('Upload failed:', error);
      }
     }
  }
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location = '/login';
  };
  const Historygo = () => {
    window.location = '/history'
  }

  return (
    <>
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
            <Button variant="text" style={{ marginRight: '10px' }} onClick={Historygo}>History</Button>
            <Button variant="contained" color='error' onClick={handleLogout}>Log out</Button>
          </div>
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: '20px'}}>
        {product && (
          <div style={{ border: '1px ', borderRadius: '5px', padding: '20px', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'center', marginTop:"100px"}}>
              <img src={`data:image/png;base64, ${product.img}`}  style={{ width: '100%', maxWidth: '650px', height: '400px' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', margin: '10px 0' }}>
              {product.product_name}
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold' }}>
              <label>Rent:</label>
              <select value={quantity} onChange={handlePriceChange} style={{ fontSize: '20px', fontWeight: 'bold' }}>
                <option value={0}>-</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <label>   Day </label>
            </div>
            <div style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '10px' ,color:'red'}}>
              Total Price: {(product.price * quantity).toLocaleString()}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button size="small" variant="contained" color="success" onClick={() => handleSubmit()}>
                Book !!!
              </Button>
            </div>
          </div>
         
        )}
       </main>
    </>
  );
  
}
export default Cardetail;
