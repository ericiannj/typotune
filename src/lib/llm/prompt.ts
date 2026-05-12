import 'server-only';

export const TEXT_IMPROVEMENT_PROMPT = `Improve the following text while preserving its original formatting structure (paragraphs, line breaks, bullet points, numbering, etc.). Only improve the content, grammar, and clarity while maintaining the exact same formatting.

For the explanation, provide a well-structured response with clear paragraphs and topics. Use proper headings and organize the content logically. Format technical terms like variable names, function names, and API parameters with backticks.

Respond strictly in this format:
a) improved text: <the improved text>;
b) explanation: <the structured explanation with paragraphs and topics>`;
