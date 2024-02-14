var headline = document.querySelector('.headline'),
    inner = document.querySelector('.inner'),
    nav = document.querySelector('nav'),
    navHeight = 75;

  
window.addEventListener('scroll', function() {
  var scrollTop = window.scrollY,
      headlineHeight = headline.offsetHeight - navHeight;

  headline.style.opacity = 1 - scrollTop / headlineHeight;
  inner.childNodes.forEach(function(child) {
    if (child.nodeType === 1) {
      child.style.transform = 'translateY(' + scrollTop * 0.4 + 'px)';
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Tüm "Show All" butonlarına tıklama olayını dinle
  var showAllButtons = document.querySelectorAll('.button-primary');
  showAllButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Tüm butonlara tıklandığında "places.php" sayfasını aç
      window.location.href = 'places.php';
    });
  });
});