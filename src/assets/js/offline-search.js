// Adapted from code by Matt Walters https://www.mattwalters.net/posts/2018-03-28-hugo-and-lunr/

(function ($) {
  'use strict';

  $(document).ready(function () {
    const $searchInput = $('.td-search input, .home-search input, input.td-search__input, input.home-search__input');

    if ($searchInput.length === 0) {
      return;
    }

    function disposePopover($target) {
      if (typeof bootstrap !== 'undefined' && bootstrap.Popover && $target && $target.length) {
        const popover = bootstrap.Popover.getInstance($target[0]);
        if (popover !== null) {
          popover.dispose();
        }
      }
    }

    //
    // Register handlers
    //

    let debounceTimeout = null;
    $searchInput.on('input', (event) => {
      const $target = $(event.target);
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        render($target);
      }, 150);
    });

    $searchInput.on('change', (event) => {
      clearTimeout(debounceTimeout);
      render($(event.target));
    });

    // Close on Escape key
    $(document).on('keydown', (event) => {
      if (event.key === 'Escape') {
        $searchInput.each(function () {
          disposePopover($(this));
        });
      }
    });

    // Close when clicking outside
    $(document).on('pointerdown', (event) => {
      const $clicked = $(event.target);
      if (!$clicked.closest('.td-offline-search-results').length && !$clicked.closest($searchInput).length) {
        $searchInput.each(function () {
          disposePopover($(this));
        });
      }
    });

    // Prevent reloading page on sidebar search enter
    $('.td-sidebar__search').on('submit', () => {
      return false;
    });

    //
    // Lunr setup
    //

    let idx = null;
    const resultDetails = new Map();

    let searchIndexUrl = null;
    $searchInput.each(function () {
      const url = $(this).data('offline-search-index-json-src');
      if (url && !searchIndexUrl) {
        searchIndexUrl = url;
      }
    });

    if (!searchIndexUrl) {
      const $anyWithSrc = $('[data-offline-search-index-json-src]').first();
      if ($anyWithSrc.length) {
        searchIndexUrl = $anyWithSrc.data('offline-search-index-json-src');
      } else {
        searchIndexUrl = '/offline-search-index.json';
      }
    }

    $.ajax({
      url: searchIndexUrl,
      dataType: 'json'
    }).then((data) => {
      if (!data) return;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (err) {
          console.error('[Docsy] Error parsing offline search index JSON:', err);
          return;
        }
      }
      if (!Array.isArray(data)) {
        if (data && typeof data === 'object') {
          data = Object.values(data);
        } else {
          return;
        }
      }

      idx = lunr(function () {
        this.ref('ref');

        this.field('title', { boost: 5 });
        this.field('categories', { boost: 3 });
        this.field('tags', { boost: 3 });
        this.field('description', { boost: 2 });
        this.field('body');

        data.forEach((doc) => {
          this.add(doc);

          resultDetails.set(doc.ref, {
            title: doc.title,
            excerpt: doc.excerpt,
          });
        });
      });

      // If an input already has text, render results immediately
      $searchInput.each(function () {
        if ($(this).val().trim()) {
          render($(this));
        }
      });
    }).catch((err) => {
      console.warn('[Docsy] Offline search index could not be loaded:', err);
    });

    const render = ($targetSearchInput) => {
      disposePopover($targetSearchInput);

      if (idx === null) {
        return;
      }

      const searchQuery = $targetSearchInput.val().trim();
      if (searchQuery === '') {
        return;
      }

      const maxResults = $targetSearchInput.data('offline-search-max-results') || 10;
      let results = [];

      try {
        results = idx
          .query((q) => {
            const tokens = lunr.tokenizer(searchQuery.toLowerCase());
            tokens.forEach((token) => {
              const queryString = token.toString();
              q.term(queryString, {
                boost: 100,
              });
              q.term(queryString, {
                wildcard:
                  lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
                boost: 10,
              });
              q.term(queryString, {
                editDistance: 2,
              });
            });
          })
          .slice(0, maxResults);
      } catch (err) {
        try {
          results = idx.search(searchQuery).slice(0, maxResults);
        } catch (e) {
          console.warn('[Docsy] Search query error:', e);
          results = [];
        }
      }

      const $html = $('<div>');

      const $closeBtn = $('<span>')
        .addClass('td-offline-search-results__close-button')
        .attr('title', 'Close search')
        .attr('aria-label', 'Close')
        .html('&times;')
        .on('click', (e) => {
          e.preventDefault();
          $targetSearchInput.val('');
          disposePopover($targetSearchInput);
        });

      $html.append(
        $('<div>')
          .addClass('td-offline-search-results__header')
          .append($('<span>').text('Search results'))
          .append($closeBtn)
      );

      const offset = $targetSearchInput.offset() || { top: 0 };
      const $searchResultBody = $('<div>')
        .addClass('td-offline-search-results__body')
        .css({
          maxHeight: `calc(100vh - ${offset.top - $(window).scrollTop() + 180}px)`,
          overflowY: 'auto',
        });
      $html.append($searchResultBody);

      if (results.length === 0) {
        $searchResultBody.append(
          $('<p>')
            .addClass('text-body-secondary my-2')
            .text(`No results found for query "${searchQuery}"`)
        );
      } else {
        const baseHref = $targetSearchInput.data('offline-search-base-href') || '/';
        const cleanBase = baseHref.endsWith('/') ? baseHref : baseHref + '/';

        results.forEach((r) => {
          const doc = resultDetails.get(r.ref);
          if (!doc) return;
          const href = cleanBase + r.ref.replace(/^\//, '');

          const $entry = $('<div>').addClass('td-offline-search-results__entry');

          $entry.append(
            $('<small>')
              .addClass('d-block td-offline-search-results__path')
              .text(r.ref)
          );

          $entry.append(
            $('<a>')
              .addClass('d-block td-offline-search-results__title')
              .attr('href', href)
              .text(doc.title)
          );

          if (doc.excerpt) {
            $entry.append(
              $('<p>')
                .addClass('td-offline-search-results__excerpt')
                .text(doc.excerpt)
            );
          }

          $searchResultBody.append($entry);
        });
      }

      if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
        const popover = new bootstrap.Popover($targetSearchInput[0], {
          content: $html[0],
          html: true,
          sanitize: false,
          trigger: 'manual',
          customClass: 'td-offline-search-results',
          placement: 'bottom',
        });
        popover.show();
      }
    };
  });
})(jQuery);
