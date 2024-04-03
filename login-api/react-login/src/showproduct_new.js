import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductWithImage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3333/showproducts'); // เรียก API Endpoint ที่ดึงข้อมูลสินค้า
        setProducts(response.data); // ตั้งค่า state ของสินค้าด้วยข้อมูลที่ได้รับ
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.product_name}</h2>
          <p>{product.product_detail}</p>
          <p>Price: {product.price}</p>
          <img src={`data:image/png;base64, ${product.img}`} alt="Product" /> {/* แสดงรูปภาพ */}
        </div>
      ))}
    </div>
  );
};

export default ProductWithImage;
