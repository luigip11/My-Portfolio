(function() {
  const includeNodes = Array.from(document.querySelectorAll('[data-include]'));

  const loadInclude = async (node) => {
    const path = node.getAttribute('data-include');
    const response = await fetch(path, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Unable to load section: ${path}`);
    }

    node.outerHTML = (await response.text()).trim();
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
