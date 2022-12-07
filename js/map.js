

function initMap() {
    // The location of Uluru
    const home = { lat: 10.797900, lng: 106.703732 };
    // The map, centered at home
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 20,
      center: home,
    });
    // The marker, positioned at home
    const marker = new google.maps.Marker({
      position: home,
      map: map,
    });
  }
  
  window.initMap = initMap;