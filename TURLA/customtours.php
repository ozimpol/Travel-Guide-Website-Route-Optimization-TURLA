<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title</title>
  <link rel="stylesheet" href="css/custom.css">
</head>
<body>


  <nav style="margin-top: -100px;">
    <div class="logo"><a href="home.php">TURLA</a></div>
    <ul>
      <li><a href="places.php">Places</a></li>
      <li><a href="customtours.php">Custom Tour</a></li>
      <li><a href="Contact.php">Contact</a></li>
    </ul>
  </nav>

  <h2 class="cart-title">Tour</h2>
  <section class="cart" id="cart-container">
    
    <div class="cart-wrapper">
        
        <div class="cart-cards">
        <!-- Kartlar burada dinamik olarak oluşturulacak -->
        </div>
        <button class="calculate-button">Calculate Total</button>
    </div>
  </section>

  <div class="places-card-list" id="card-container">
    <!-- Cardlar burada dinamik olarak oluşturulacak -->
  </div>

  <script src="custom.js"></script>
</body>
</html>
