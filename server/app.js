var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'Fullstack-login';
const multer = require('multer');
//const basePath = 'react-login/src/img';  C:\fullstack-login\login-api\react-login\src\img\product
const basePath = './img/product';
//const bookpath = '';
require('dotenv').config()




app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors())

app.use(express.json())

// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//   host: process.env.ENV_LOCALHOST,
//   user: process.env.ENV_USER,
//   database: process.env.ENV_DATABASE ,
//   password : process.env.ENV_PASSWORD
// });

//-----------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "react-login/src/img/product")
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage })
//----------------------------------------------------------------------------------------------------

const connection = require('./database.js');

// app.post('/register', jsonParser, function (req, res, next) {
//   bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//   connection.query(
//       'INSERT INTO users (email, password, firstname , lastname) VALUES (?, ?, ?, ?)',
//       [req.body.email, hash, req.body.firstname, req.body.lastname],
//       function (err, results, fields) {
//         if (err) {
//           res.json({ status: 'error', message: err })
//           return
//         }
//         res.json({ status: 'ok' })
//       }
//     );
//   });

// })
// app.post('/register', async (req, res) => {
//   const { email, password, firstname, lastname } = req.body;
//   bcrypt.hash(password, saltRounds, function (err, hash) {
//     try {
//       const query = 'INSERT INTO users (email, password, firstname , lastname) VALUES (?, ?, ?, ?)';
//       const result = connection.query(query, [email, hash, firstname, lastname]);

//       console.log(result);
//       res.json({ status: 'ok' })
//     } catch (err) {
//       console.error('Error during registration:', err);
//       if (err.code === 'ER_DUP_ENTRY') {
//         res.status(409).send('Username already exists.');
//       } else {
//         res.status(500).send('Internal Server Error');
//       }
//     }
//   });
// })

app.post('/register', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const query = 'INSERT INTO users (email, password, firstname , lastname) VALUES (?, ?, ?, ?)';
    const result = await connection.query(query, [email, password, firstname, lastname]);

    console.log(result);
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Error during registration:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send('Username already exists.');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});


// const secret = process.env.JWT_SECRET || 'your_secret_key';

app.post('/login', jsonParser, async function (req, res, next) {
  try {
    const [users] = await connection.query('SELECT * FROM users WHERE email=? AND password = ? ', [req.body.email, req.body.password]);

    if (users.length === 0) {
      res.status(404).json({ status: 'error', message: 'No user found' });
      return;
    }
    else {

      const token = jwt.sign({ email: users.email }, secret, { expiresIn: '1h' });
      const userId = users.id;
      res.json({ status: 'ok', message: 'Login success', token, userId });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// app.post('/login', jsonParser, async function (req, res, next) {
//   await connection.query(
//     'SELECT * FROM users WHERE email=?',
//     [req.body.email],
//     function (err, users, fields) {
//       if (err) { res.json({ status: 'error', message: err }); return }
//       if (users.length == 0) { res.json({ status: 'error', message: 'no user found' }); return }
//       bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
//         if (isLogin) {
//           //var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
//           const userId = users[0].id;
//           res.json({ status: 'ok', message: 'Login success', token, userId })
//         } else {
//           res.json({ status: 'error', message: 'Login failed' })
//         }
//       });
//     }
//   );
// })

app.post('/authen', jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret);
    res.json({ status: 'ok', decoded })
  } catch (err) {
    res.json({ status: 'error', message: err.message })
  }

})

app.post('/insertproduct', upload.single('file'), function (req, res, next) {
  connection.execute(
    'INSERT INTO product (product_name, product_detail, price , img ) VALUES ( ?, ?, ?, ?)',
    [req.body.product_name, req.body.product_detail, req.body.price, req.file.filename],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err })
        return
      }
      res.json({ status: 'ok' })
    }
  );


})

// app.post('/showproduct', function (req, res, next) {
//     connection.query('SELECT product_id, product_name, product_detail, price, img FROM product', function (error, results, fields) {
//       if (error) {
//         res.json({ status: 'error', message: error });
//         return;
//       }

//       console.log('Results from the database:', results);

//       // ส่งข้อมูลทั้งหมดกลับเป็น JSON
//       const products = results.map(result => ({
//         product_id: result.product_id,
//         product_name: result.product_name,
//         price: result.price,
//         product_detail: result.product_detail,
//         img: basePath + '/' + result.img
//       }));

//       res.json({ status: 'ok', products: products });
//     });
// });

// app.delete('/deleteproduct/:id', function (req, res, next) {
//   const productId = req.params.id;

//   connection.query('DELETE FROM product_new WHERE product_id = ?', [productId], function (error, results, fields) {
//     if (error) {
//       res.json({ status: 'error', message: error });
//       return;
//     }

//     console.log('Delete result:', results);

//     if (results.affectedRows > 0) {
//       res.json({ status: 'ok', message: 'Product deleted successfully.' });
//     } else {
//       res.json({ status: 'error', message: 'Product not found or already deleted.' });
//     }
//   });
// });

app.delete('/deleteproduct/:id', async(req, res)=>{
  const productId = req.params.id;
  try {
    const query = 'DELETE FROM product_new WHERE product_id = ?'
    await connection.query(query, [productId]);
    
    
    res.status(201).json({ status: 'ok'});
  }
  catch (err) {
    console.error('Error', err);
    res.status(500).send('Internal Server Error');
  }
})

// app.post('/productdetail/:id', function (req, res, next) {
//   const productId = req.params.id;

//   connection.query('SELECT * FROM product_new WHERE product_id = ?', [productId], function (error, results, fields) {
//     if (error) {
//       res.json({ status: 'error', message: error });
//       return;
//     }

//     console.log('Product Detail Results:', results);

//     if (results.length > 0) {
//       const productDetail = {
//         product_id: results[0].product_id,
//         product_name: results[0].product_name,
//         price: results[0].price,
//         img: results[0].img

//       };

//       res.json({ status: 'ok', productDetail: productDetail });
//     } else {
//       res.json({ status: 'error', message: 'Product not found.' });
//     }
//   });
// });

// app.post('/updateproduct/:id', upload.single('file'), function (req, res, next) {
//   const productId = req.params.id;

//   connection.execute(
//       'UPDATE product SET product_name = ?, product_detail = ?, price = ?, img = ? WHERE product_id = ?',
//       [req.body.product_name, req.body.product_detail, req.body.price, req.file.filename, productId],
//       function (err, results, fields) {
//           if (err) {
//               res.json({ status: 'error', message: err });
//               return;
//           }
//           res.json({ status: 'ok' });
//       }
//   );
// });


//------------------------------------new part -------------------------------------------------

// app.post('/uploadnew', (req, res) => {
//   const { productName, price, imageData } = req.body;

//   const sql = 'INSERT INTO product_new (product_name, price, img) VALUES (?, ?, ?)';
  
//   connection.query(sql, [productName, price, imageData], (err, result) => {
//     if (err) {
//       console.error('Error uploading :', err);
//       res.status(500).json({ error: 'Failed to upload ' });
//       return;
//     }
//     console.log('uploaded successfully');
//     res.status(200).json({ message: 'uploaded successfully' });
//   })

// });
app.post('/uploadnew', async (req, res) => {
  const { productName, price, imageData } = req.body;
 
  try {
    const query = 'INSERT INTO product_new (product_name, price, img) VALUES (?, ?, ?)'
    await connection.query(query, [productName, price, imageData]);

    res.status(201).json({ status: 'ok'});
  }
  catch (err) {
    console.error('Error', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/upbooking', async (req, res) => {
  const { quantity, totalprice, car_id, user_id } = req.body;

  try {
    const query = 'INSERT INTO booking (quantity, totalprice, car_id, user_id) VALUES(?, ?, ?, ?)'
    await connection.query(query, [quantity, totalprice, car_id, user_id]);

    res.status(201).json({ status: 'ok'});
  }
  catch (err) {
    console.error('Error', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/updateproduct/:id', async (req, res) => {
  const { productName, price, imageData } = req.body;
  const productId = req.params.id;

  // connection.query(sql, [productName, price, imageData, productId], (err, result) => {
  //   if (err) {
  //     console.error('Error uploading image:', err);
  //     res.status(500).json({ error: 'Failed to upload image' });
  //     return;
  //   }
  //   console.log('uploaded successfully');
  //   res.status(200).json({ message: 'uploaded successfully' });
  // })
  try {
    const query = 'UPDATE product_new SET product_name = ?, price = ?, img = ? WHERE product_id = ?'
    await connection.query(query, [productName, price, imageData, productId]);
    res.status(201).json({ status: 'ok'});
  }
  catch (err) {
    console.error('Error', err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/showproducts', (req, res) => {
  const sql = 'SELECT * FROM product_new';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
      return;
    }
    res.json(results); // ส่งข้อมูลสินค้ากลับไปยังแอป React ในรูปแบบ JSON
  });
});

app.get('/showproductfromid/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM product_new WHERE product_id = ${id}`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ error: 'Failed to fetch product' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(results[0]); // ส่งข้อมูลสินค้ากลับไปยังแอป React ในรูปแบบ JSON
  });
});

app.get('/history/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM booking WHERE user_id = ${id}`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching Booking:', err);
      res.status(500).json({ error: 'Failed to fetch Booking' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.json(results);
  })
})


//-----------------------------------------------------------------------------------------------
app.listen(process.env.ENV_PORT, function () {
  console.log('CORS-enabled web server listening on port' + process.env.ENV_PORT)
})