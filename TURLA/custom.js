let coordsArray = [];

function createCard(cardData) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-category', cardData.category);
  
  const header = document.createElement('header');
  header.className = 'card-header';
  header.style.backgroundImage = `url('${cardData.image}')`;
  
  const title = document.createElement('h4');
  title.className = 'card-header--title';
  title.textContent = cardData.title;
  
  const body = document.createElement('div');
  body.className = 'card-body';
  
  const heading = document.createElement('h2');
  heading.textContent = cardData.title;
  
  const paragraph = document.createElement('p');
  paragraph.className = 'body-content';

  
  const button = document.createElement('button');
  button.className = 'button button-primary';
  button.innerHTML = '<i class="fa fa-chevron-right"></i>Add to Tour';
  button.addEventListener('click', function() {
    addToCart(cardData);
  });

  header.appendChild(title);
  body.appendChild(heading);
  body.appendChild(button);
  
  card.appendChild(header);
  card.appendChild(body);
  
  return card;
}

function addToCart(cardData) {
    const cart = document.getElementById('cart-container');
  
    // Check if the card with the same coordinates already exists in the cart
    if (coordsArray.includes(cardData.coords)) {
        alert("This card is already in the cart!");
        return; // Exit the function if the card already exists
    } else{
  
    // Create card element for cart
    const cartCard = document.createElement('article');
    cartCard.className = 'cart-card';
  
    // Create header for cart card
    const cartHeader = document.createElement('header');
    cartHeader.className = 'cart-card-header';
  
    // Create image for cart card
    const cartImage = document.createElement('img');
    cartImage.src = cardData.image;
    cartImage.alt = cardData.title;
  
    // Create title for cart card
    const cartTitle = document.createElement('h4');
    cartTitle.textContent = cardData.title;
  
    // Create remove button for cart card
    const removeButton = document.createElement('button');
    removeButton.className = 'button button-remove';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
      removeFromCart(cartCard, cardData);
    });
  
    // Append cart title and remove button to cart header
    cartHeader.appendChild(cartImage);
    cartHeader.appendChild(cartTitle);
    cartHeader.appendChild(removeButton);
  
    // Append cart card header to cart card
    cartCard.appendChild(cartHeader);
  
    // Append cart card to cart
    cart.appendChild(cartCard);
  
    // Add coordinates to array
    coordsArray.push(cardData.coords); }
}

  


function removeFromCart(cartCard, cardData) {
  const cart = document.getElementById('cart-container');
  cart.removeChild(cartCard);

  // Remove coordinates from array
  const index = coordsArray.indexOf(cardData.coords);
  if (index > -1) {
    coordsArray.splice(index, 1);
  }
}

window.addEventListener('load', function() {
  const cardContainer = document.getElementById('card-container');
  
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const cards = data.map(createCard);
      cardContainer.append(...cards);
    })
    .catch(error => console.error('Veri alma hatası:', error));
});


/////////////
document.querySelector('.calculate-button').addEventListener('click', function() {
  // Check if there are at least 2 places in the tour
  if (coordsArray.length < 1) {
      alert("Please add at least 1 or more places to create a tour plan.");
      return;
  }
  
  // Get user's current location
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const userCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          };
          
          // Add user's current location to the beginning of the coordinates array
          coordsArray.unshift(`${userCoords.latitude},${userCoords.longitude}`);
          
          // Calculate the shortest route using 2-opt algorithm
          const shortestRoute = calculateShortestRoute(coordsArray);
          
          // Generate Google Maps link with shortest route
          const mapsLink = generateMapsLink(shortestRoute);
          
          // Open Google Maps link in a new tab
          window.open(mapsLink, '_blank');

          // Clear the coordinates array and reload the page after redirecting
          coordsArray = [];
          location.reload();
      }, function(error) {
          console.error('Error getting user location:', error);
      });
  } else {
      alert("Geolocation is not supported by this browser.");
  }
});


// Function to calculate the shortest route using 2-opt algorithm
function calculateShortestRoute(coordsArray) {
  // Create initial route
  let currentRoute = coordsArray.slice();
  let bestRoute = coordsArray.slice();
  let improved = true;
  
  // Calculate the total distance of a route
  const calculateTotalDistance = (route) => {
      let totalDistance = 0;
      for (let i = 0; i < route.length - 1; i++) {
          const [lat1, lon1] = route[i].split(',');
          const [lat2, lon2] = route[i + 1].split(',');
          totalDistance += calculateDistance(parseFloat(lat1), parseFloat(lon1), parseFloat(lat2), parseFloat(lon2));
      }
      return totalDistance;
  };
  
  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const earthRadius = 6371; // Radius of the earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
      return distance;
  };
  
  // Swap function for 2-opt algorithm
  const swap = (route, i, j) => {
      const newRoute = route.slice(0, i);
      newRoute.push(...route.slice(i, j + 1).reverse());
      newRoute.push(...route.slice(j + 1));
      return newRoute;
  };
  
  // Main loop of 2-opt algorithm
  while (improved) {
      improved = false;
      for (let i = 1; i < currentRoute.length - 2; i++) {
          for (let j = i + 1; j < currentRoute.length - 1; j++) {
              const newRoute = swap(currentRoute, i, j);
              const currentDistance = calculateTotalDistance(currentRoute);
              const newDistance = calculateTotalDistance(newRoute);
              if (newDistance < currentDistance) {
                  currentRoute = newRoute;
                  improved = true;
              }
          }
      }
      if (improved) {
          bestRoute = currentRoute;
      }
  }
  
  return bestRoute;
}


// Function to generate Google Maps link with the shortest route
function generateMapsLink(route) {
  const mapsBaseUrl = 'https://www.google.com/maps/dir/';
  const waypoints = route.join('/');
  return `${mapsBaseUrl}${waypoints}`;
}