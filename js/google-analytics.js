(function() {
  // 1. Create the async script tag that loads gtag.js
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-FPKPM82P5B';
  document.head.appendChild(gtagScript);

  // 2. Set up the dataLayer and gtag() command queue
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  // 3. Initialise the tracker
  gtag('js', new Date());
  gtag('config', 'G-FPKPM82P5B');
})();
