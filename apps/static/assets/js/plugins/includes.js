//list view js start here

const search = document.querySelector('.search-wrapper input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);
function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// grid css start here
document.addEventListener("DOMContentLoaded", function() {
    // Select all the cards
    var cards = document.querySelectorAll(".container_card");
  
    // Loop through each card and apply the logic
    cards.forEach(function(card) {
      // Get the initial price from the current card's .amount element
      var price = parseInt(card.querySelector(".amount").textContent);
  
      // Add event listener for the plus button in the current card
      card.querySelector(".fa-plus").addEventListener("click", function() {
        var _num = parseInt(card.querySelector("span.number").textContent) + 1;
        card.querySelector("span.number").textContent = _num;
        updatePrice(card, _num, price);
      });
  
      // Add event listener for the minus button in the current card
      card.querySelector(".fa-minus").addEventListener("click", function() {
        var _num = parseInt(card.querySelector("span.number").textContent) - 1;
        if (_num >= 0) {
          card.querySelector("span.number").textContent = _num;
          updatePrice(card, _num, price);
        }
      });
    });
  
    // Function to update the price for a specific card
    function updatePrice(card, num, price) {
      card.querySelector(".amount").textContent = (num * price);
    }
  });
  



//list_viws js 
document.addEventListener("DOMContentLoaded", function() {
    // Select all the cards
    var cards = document.querySelectorAll(".item_block");
  
    // Loop through each card and apply the logic
    cards.forEach(function(card) {
      // Get the initial price from the current card's .amount element
      var price = parseInt(card.querySelector(".amount").textContent);
  
      // Add event listener for the plus button in the current card
      card.querySelector(".fa-plus").addEventListener("click", function() {
        var _num = parseInt(card.querySelector("span.number").textContent) + 1;
        card.querySelector("span.number").textContent = _num;
        updatePrice(card, _num, price);
      });
  
      // Add event listener for the minus button in the current card
      card.querySelector(".fa-minus").addEventListener("click", function() {
        var _num = parseInt(card.querySelector("span.number").textContent) - 1;
        if (_num >= 0) {
          card.querySelector("span.number").textContent = _num;
          updatePrice(card, _num, price);
        }
      });
    });
  
    // Function to update the price for a specific card
    function updatePrice(card, num, price) {
      card.querySelector(".amount").textContent = (num * price);
    }
  });




/* searching logic in grid start here  */

  const cards = document.querySelectorAll('.container_card');
  const fadeDuration = 800; // Duration of fade effect in milliseconds
  
  search.addEventListener('input', searchCards);
  
  function searchCards() {
    const search_data = search.value.toLowerCase();
  
    let visibleIndex = 0; 
    cards.forEach((card, i) => {
      let card_data = card.textContent.toLowerCase();
  
      if (search_data === '') {
        fadeIn(card);
        card.style.backgroundColor = (i % 2 === 0) ? 'transparent' : '#0000000b';
      } else if (card_data.indexOf(search_data) >= 0) {
        fadeIn(card);
  
        card.style.backgroundColor = (visibleIndex % 2 === 0) ? 'transparent' : '#0000000b';
  
        visibleIndex++; 
      } else {
        fadeOut(card);
      }
    });
  }
  
  // Fade out effect
  function fadeOut(element) {
    element.style.transition = `opacity ${fadeDuration}ms`; // Set the transition duration
    element.style.opacity = 0; // Start fade out
  
    // After the fade-out duration, hide the card
    setTimeout(() => {
      element.style.display = 'none';
    }, fadeDuration);
  }
  
  // Fade in effect
  function fadeIn(element) {
    element.style.display = 'block'; 
    element.style.transition = `opacity ${fadeDuration}ms`;
    element.style.opacity = 1; 
  }
  

/* searching logic in grid end here here  */