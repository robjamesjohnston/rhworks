/*!
 * R H Works
 */

'use strict';

//Index Fader
window.addEventListener(
  'DOMContentLoaded',
  function (e) {
    var stage = document.getElementById('stage');
    if (stage) {
      var fadeComplete = function (e) {
        stage.appendChild(arr[0]);
      };
      var arr = stage.getElementsByTagName('img');
      for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener('animationend', fadeComplete, false);
      }
    }
  },
  false,
);

// Flickity instance
var flick = document.querySelector('.carousel');
if (flick) {
  var flkty = new Flickity(flick, {
    // options
    wrapAround: true,
    autoPlay: 2000,
    setGallerySize: false,
    arrowShape: {
      x0: 0,
      x1: 50,
      y1: 50,
      x2: 53,
      y2: 47,
      x3: 6,
    },
    pageDots: false,
  });

  // Flickity instance captions
  var caption = document.querySelector('.caption p');
  function setCaption() {
    // set image caption using img's alt
    caption.textContent = flkty.selectedElement.children[0].alt;
  }
  setCaption();
  flkty.on('select', function () {
    setCaption();
  });

  // Flickity instance numbers
  var number = document.querySelector('.number p');
  function setNumber() {
    var slideNumber = flkty.selectedIndex + 1;
    number.textContent = slideNumber + ' — ' + flkty.slides.length;
  }
  setNumber();
  flkty.on('select', function () {
    setNumber();
  });
}

// Show/hide description
var toggle = document.querySelector('.toggle');
var words = document.querySelector('.words');
var iframe = document.querySelector('iframe');
if (toggle) {
  const mediaQuery = window.matchMedia('(min-aspect-ratio: 3/4)');
  function handleDeviceChange(e) {
    if (e.matches || iframe) {
      toggle.innerHTML = '<svg class="svg-icon --close" viewBox="0 0 16 16"><path d="M8.55,7.968l7.301-7.301c0.153-0.152,0.153-0.399,0-0.551c-0.152-0.152-0.397-0.152-0.55,0L8,7.417L0.699,0.116c-0.152-0.152-0.399-0.152-0.551,0s-0.152,0.399,0,0.551l7.301,7.301L0.147,15.27c-0.152,0.151-0.152,0.398,0,0.55c0.152,0.153,0.399,0.153,0.551,0L8,8.519l7.301,7.301c0.152,0.153,0.397,0.153,0.55,0c0.153-0.151,0.153-0.398,0-0.55L8.55,7.968z"/></svg>';
      toggle.style.display = 'block';
      words.style.display = 'inline-block';
      var showWords = true;
      toggle.addEventListener('click', function () {
        showWords = !showWords;
        if (showWords === false) {
          toggle.innerHTML = '<svg class="svg-icon --open" viewBox="0 0 16 16"><path d="M8.55,7.968l7.301-7.301c0.153-0.152,0.153-0.399,0-0.551c-0.152-0.152-0.397-0.152-0.55,0L8,7.417L0.699,0.116c-0.152-0.152-0.399-0.152-0.551,0s-0.152,0.399,0,0.551l7.301,7.301L0.147,15.27c-0.152,0.151-0.152,0.398,0,0.55c0.152,0.153,0.399,0.153,0.551,0L8,8.519l7.301,7.301c0.152,0.153,0.397,0.153,0.55,0c0.153-0.151,0.153-0.398,0-0.55L8.55,7.968z" transform="rotate(45 8 8)"/></svg>';
          words.style.display = 'none';
        } else {
          toggle.innerHTML = '<svg class="svg-icon --close" viewBox="0 0 16 16"><path d="M8.55,7.968l7.301-7.301c0.153-0.152,0.153-0.399,0-0.551c-0.152-0.152-0.397-0.152-0.55,0L8,7.417L0.699,0.116c-0.152-0.152-0.399-0.152-0.551,0s-0.152,0.399,0,0.551l7.301,7.301L0.147,15.27c-0.152,0.151-0.152,0.398,0,0.55c0.152,0.153,0.399,0.153,0.551,0L8,8.519l7.301,7.301c0.152,0.153,0.397,0.153,0.55,0c0.153-0.151,0.153-0.398,0-0.55L8.55,7.968z"/></svg>';
          words.style.display = 'inline-block';
        }
      });
    } else {
      toggle.style.display = 'none';
      words.style.display = 'inline-block';
    }
  }
  // Register event listener
  mediaQuery.addListener(handleDeviceChange);
  // Initial check
  handleDeviceChange(mediaQuery);
}
