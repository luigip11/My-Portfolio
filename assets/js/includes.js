(function() {
  const includeNodes = Array.from(document.querySelectorAll('[data-include]'));

  const loadInclude = async (node) => {
    const path = node.getAttribute('data-include');
    const response = await fetch(path, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Unable to load section: ${path}`);
    }

    const markup = (await response.text()).trim();
    const parser = new DOMParser();
    const doc = parser.parseFromString(markup, 'text/html');
    const partialRoot = doc.querySelector('[data-partial-root]');

    node.outerHTML = partialRoot ? partialRoot.innerHTML.trim() : markup;
  };

  window.sectionsReady = Promise.all(includeNodes.map(loadInclude))
    .then(() => {
      document.dispatchEvent(new CustomEvent('sections:loaded'));
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
})();
