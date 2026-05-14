export const formatTechnicalTerms = (text: string) => {
  return text.replace(/`([^`]+)`/g, (_match, term) => {
    return `<span class="inline-block px-1.5 py-0.5 mx-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-sm font-mono font-medium">${term}</span>`;
  });
};

export const formatExplanations = (text: string) => {
  let cleaned = text
    .replace(/^<|>$/g, '')
    .replace(/^\*\s*/, '')
    .trim();

  cleaned = cleaned.replace(
    /^### (.*$)/gim,
    '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">$1</h3>',
  );
  cleaned = cleaned.replace(
    /^## (.*$)/gim,
    '<h2 class="text-xl font-semibold text-gray-800 mt-4 mb-2">$1</h2>',
  );
  cleaned = cleaned.replace(
    /^# (.*$)/gim,
    '<h1 class="text-2xl font-bold text-gray-800 mt-4 mb-3">$1</h1>',
  );

  cleaned = cleaned.replace(/\n\n/g, '</p><p class="mb-3 text-gray-700">');
  cleaned = cleaned.replace(/\n/g, '<br>');
  cleaned = `<p class="mb-3 text-gray-700">${cleaned}</p>`;

  return formatTechnicalTerms(cleaned);
};
