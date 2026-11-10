/* ==================== YOUR PRODUCTS ====================
   To ADD a product:
     1. Put its photos in the "images" folder (e.g. images/shoe-rack-1.jpg)
     2. Copy the TEMPLATE block below (from { to },)
     3. Paste it at the end of the list, just above the line with ];
     4. Change the details, save, and open index.html to check it

   Rules so nothing breaks:
     - Keep the "quotes" around every value
     - Every product block ends with  },   (curly bracket + comma)
     - price: numbers only, no ₦ or commas. Use "" to show "Ask for price"
     - photo: one or more image paths separated by a space
     - category: 3D Printed Models, Filaments, Stallion Drone, or a new one
     - paystack: paste a Paystack payment-page link, or leave "" to hide that button
     - The "Buy now" (Bachs) button appears automatically for any product with a price

   TEMPLATE (copy this):
   {
     name: "Product name",
     category: "3D Printed Models",
     price: "15000",
     photo: "images/photo-1.jpg images/photo-2.jpg",
     description: "Short description: size, material, colours.",
     paystack: ""
   },
========================================================== */

globalThis.PRODUCTS = [

  {
    name: "Cyberpunk Katana",
    category: "3D Printed Models",
    price: "42000",
    photo: "images/cyberpunk-katana-1.jpg images/cyberpunk-katana-2.jpg",
    description: "3D printed cyberpunk-style katana in blue and black with a curved blade and detailed mechanical hilt. Great for display, cosplay and gifts. Ask on WhatsApp for other colours.",
    paystack: ""
  },
   
 {
       name: "Test product",
       category: "3D Printed Models",
       price: "1000",
       photo: "images/WIN_20260206_01_25_43_Pro.jpg",
       description: "Product",
       paystack: ""
     },     
];
   
