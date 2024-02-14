<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav>
    <div class="logo"><a href="home.php">TURLA</a></div>
    <ul>
      <li><a href="places.php">Places</a></li>
      <li><a href="customtours.php">Custom Tour</a></li>
      <li><a href="Contact.php">Contact</a></li>
    </ul>
  </nav>

  <header>
    <div class="headline">
      <div class="inner">
        <h1>Hello</h1>
        <p>Scroll down the page</p>
      </div>
    </div>
  </header>

  <div class="app-title-content" style="margin-top: 170px;">
      <h2>WHAT IS TURLA?</h2>
  </div>
  <section class="logo-section" style="margin-top: -170px;">
    <div class="vertical-image">
      <img src="img/icon.png" alt="TURLA LOGO">
    </div>
    <div class="quote-wrapper">
      <blockquote class="text">
      <p id="quoteText">TURLA is a travel guide website developed by Ahmet Ozan Özdemir. It is a travel guide where you can explore the best food places, historical places, and natural beauties of the respective city. You can take advantage of ready-made travel tours or create your own tour with the places you desire. Additionally, by calculating the shortest route, you can elevate your travel experience to its highest points. Although TURLA currently operates only in Adana, you should know that there is always room for further development.</p>
      </blockquote>    
    </div>
  </section>

  <section class="app-title">
    <div class="app-title-content">
      <h1>PLACES TO VISIT</h1>
    </div>

    <div class="app-card-list">
      <article class="card">
        <header class="card-header" style="background-image: url('img/food.jpg')">
          <h4 class="card-header--title"></h4>
        </header>
        <div class="card-body">
          <h2>BEST FOOD PLACES</h2>
          <p class="body-content">See best food places in Adana for the ultimate culinary experience.</p>
          <button class="button button-primary"><i class="fa fa-chevron-right"></i> Show All</button>
        </div>
      </article>

      <article class="card">
        <header class="card-header" style="background-image: url('img/historical.jpg')">
          <h4 class="card-header--title"></h4>
        </header>
        <div class="card-body">
          <h2>HISTORICAL PLACES</h2>
          <p class="body-content">Discover historical landmarks in Adana for an enriching experience.</p>
          <button class="button button-primary"><i class="fa fa-chevron-right"></i> Show All</button>
        </div>
      </article>

      <article class="card">
        <header class="card-header" style="background-image: url('img/natural.jpg')">
          <h4 class="card-header--title"></h4>
        </header>
        <div class="card-body">
          <h2>NATURAL BEAUTIES</h2>
          <p class="body-content">Explore the natural wonders of Adana for a breathtaking adventure.</p>
          <button class="button button-primary"><i class="fa fa-chevron-right"></i> Show All</button>
        </div>
      </article>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>
