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

    // Handle search form submissions (e.g. on Enter key)
    $('.td-sidebar__search, .home-search__form').on('submit', function (e) {
      e.preventDefault();
      const $input = $(this).find('input');
      const q = $input.val().trim();
      if (q) {
        window.location.href = '/search/?q=' + encodeURIComponent(q);
      }
      return false;
    });

    //
    // Breadcrumb formatting helper
    //
    const SECTION_LABELS = {
      'docs': 'Docs',
      'getting-started': 'Getting Started',
      'cloud-accounts': 'Cloud Accounts',
      'ai-agents': 'AI Agents',
      'solutions': 'Solutions',
      'integrations': 'Integrations',
      'expert-help': 'Expert Help',
      'company': 'Company',
      'account': 'Account',
      'about': 'About',
      'aws': 'AWS',
      'gcp': 'GCP',
      'azure': 'Azure',
      'alibaba': 'Alibaba Cloud',
      'oracle': 'Oracle Cloud',
      'iac-analyzer': 'IaC Analyzer',
      'lockin-analyzer': 'Lock-In Analyzer',
      'resource-catalog': 'Resource Catalog',
      'costs-analyzer': 'Costs Analyzer',
      'stack-evolution': 'Stack Evolution',
      'resources-evolution': 'Resources Evolution',
      'role-delegation': 'Role Delegation',
      'access-key': 'Access Key',
      'access-key-with-role': 'Access Key with Role',
      'managing-accounts': 'Managing Accounts',
      'job-request': 'Job Request',
      'hire-an-expert': 'Hire an Expert',
      'chat-agent': 'Chat Agent',
      'iac-agent': 'IaC Agent',
      'lockin-agent': 'Lock-In Agent',
      'resource-agent': 'Resource Agent',
      'github': 'GitHub',
      'jira': 'Jira',
      'slack': 'Slack',
      'dashboard': 'Dashboard',
      'profile': 'Profile',
      'billing': 'Billing',
      'plans': 'Plans',
      'users': 'Users',
      'overview': 'Overview',
      'compare': 'Compare',
      'executions': 'Sync Executions',
      'available': 'Available',
      'installed': 'Installed',
      'register': 'Register',
      'orders': 'Orders',
    };

    function formatBreadcrumbs(ref) {
      if (!ref) return [];
      const clean = ref.replace(/^\/+|\/+$/g, '');
      if (!clean) return [];
      const parts = clean.split('/').filter((p) => p && p !== 'en' && p !== 'docs');
      return parts.map((seg) => {
        const lower = seg.toLowerCase();
        if (SECTION_LABELS[lower]) {
          return SECTION_LABELS[lower];
        }
        return seg
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
      });
    }

    function createBreadcrumbElement(ref) {
      const crumbs = formatBreadcrumbs(ref);
      const $container = $('<div>').addClass('c2g-search-breadcrumbs');
      if (crumbs.length === 0) return $container;

      // Badge for root section
      $container.append(
        $('<span>').addClass('c2g-search-breadcrumbs__badge').text(crumbs[0])
      );

      // Remaining crumbs
      for (let i = 1; i < crumbs.length; i++) {
        $container.append(
          $('<span>').addClass('c2g-search-breadcrumbs__separator').html('&rsaquo;')
        );
        const isLast = (i === crumbs.length - 1);
        $container.append(
          $('<span>')
            .addClass('c2g-search-breadcrumbs__item' + (isLast ? ' c2g-search-breadcrumbs__item--current' : ''))
            .text(crumbs[i])
        );
      }
      return $container;
    }

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

      const $closeBtn = $('<button>')
        .attr('type', 'button')
        .addClass('td-offline-search-results__close-button')
        .attr('title', 'Close search')
        .attr('aria-label', 'Close')
        .html('<i class="fas fa-times" aria-hidden="true"></i>')
        .on('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          $targetSearchInput.val('');
          disposePopover($targetSearchInput);
        });

      const $header = $('<div>')
        .addClass('td-offline-search-results__header')
        .append(
          $('<div>')
            .addClass('d-flex align-items-center')
            .append($('<span>').text('Documentation Results'))
            .append(
              results.length > 0
                ? $('<span>').addClass('results-count-badge').text(results.length)
                : null
            )
        )
        .append($closeBtn);

      $html.append($header);

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
          $('<div>')
            .addClass('text-center py-4 px-3')
            .append($('<i class="fas fa-search fa-2x mb-2 text-body-secondary d-block"></i>'))
            .append(
              $('<p>')
                .addClass('text-body-secondary mb-0 small')
                .text(`No results found for "${searchQuery}"`)
            )
        );
      } else {
        const baseHref = $targetSearchInput.data('offline-search-base-href') || '/';
        const cleanBase = baseHref.endsWith('/') ? baseHref : baseHref + '/';

        results.forEach((r) => {
          const doc = resultDetails.get(r.ref);
          if (!doc) return;
          const href = cleanBase + r.ref.replace(/^\//, '');

          const $entry = $('<a>')
            .addClass('td-offline-search-results__entry')
            .attr('href', href);

          $entry.append(createBreadcrumbElement(r.ref));

          $entry.append(
            $('<div>')
              .addClass('td-offline-search-results__title')
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

        const $footer = $('<div>')
          .addClass('td-offline-search-results__footer')
          .append(
            $('<span>')
              .html('Press <kbd>ESC</kbd> to exit')
          )
          .append(
            $('<a>')
              .addClass('td-offline-search-results__all-link')
              .attr('href', cleanBase + 'search/?q=' + encodeURIComponent(searchQuery))
              .html('View all results <i class="fas fa-arrow-right ms-1"></i>')
          );
        $html.append($footer);
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
