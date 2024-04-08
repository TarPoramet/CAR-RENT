import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Button } from '@mui/material';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { Link } from 'react-router-dom';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import topleftImage from './img/topleft.jpg';

function History() {
  const [history, setHistory] = useState([]);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(process.env.REACT_APP_API +`/history/${id}`)
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching product detail:', error);
      });
  }, [id])

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location = '/login';
  };
  const Historygo = () => {
    window.location = '/history'
  }

  

  return (
    <div>
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
      <main style={{ marginTop: '40px', padding: '70px' }}>
        <TableContainer component={Paper}>
          <Table>

            <TableHead style={{ backgroundColor: 'black' }}>
              <TableRow>
                <TableCell style={{ color: 'red' }}><b>Booking ID</b></TableCell>
                <TableCell align="center" style={{ color: 'red' }}><b>Quantity</b></TableCell>
                <TableCell align="center" style={{ color: 'red' }}><b>Total Price&nbsp;(Bath)</b></TableCell>
                <TableCell align="center" style={{ color: 'red' }}><b>Car ID</b></TableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {history.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.booking_id}
                  </TableCell>

                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.totalprice.toLocaleString()}</TableCell>
                  <TableCell align="center">{item.car_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  )
}

export default History




