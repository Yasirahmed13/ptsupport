// Search, category filter and protocol selection for the Dosages & Protocols page.
(function () {
  var search = document.getElementById('search');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.group'));

  var dCat = document.getElementById('d-cat');
  var dName = document.getElementById('d-name');
  var dBlurb = document.getElementById('d-blurb');
  var detail = document.getElementById('detail');

  var activeCat = 'all';

  function filter() {
    var q = search.value.toLowerCase().trim();
    var shown = 0;

    cards.forEach(function (card) {
      var name = card.querySelector('.card-name').textContent.toLowerCase();
      var match = (activeCat === 'all' || card.dataset.cat === activeCat) && (!q || name.indexOf(q) !== -1);
      card.hidden = !match;
      if (match) shown++;
    });

    groups.forEach(function (group) {
      var visible = group.querySelectorAll('.card:not([hidden])').length;
      group.hidden = visible === 0;
      group.querySelector('.group-count').textContent = '(' + visible + ')';
    });

    empty.hidden = shown !== 0;
    count.textContent = shown + ' of ' + cards.length + ' compounds';
  }

  function select(card) {
    cards.forEach(function (c) { c.setAttribute('aria-pressed', c === card ? 'true' : 'false'); });
    dCat.textContent = card.querySelector('.tag').textContent;
    dName.textContent = card.querySelector('.card-name').textContent;
    dBlurb.textContent = card.querySelector('.card-blurb').textContent;

    // On stacked (mobile) layouts the panel sits below the list, so bring it into view.
    if (detail.getBoundingClientRect().top > window.innerHeight) {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  search.addEventListener('input', filter);

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeCat = chip.dataset.cat;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      filter();
    });
  });

  cards.forEach(function (card) {
    card.addEventListener('click', function () { select(card); });
  });
})();
