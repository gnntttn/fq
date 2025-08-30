export const fallbackCopyToClipboard = (text: string): boolean => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Prevent scrolling to bottom of page in MS Edge.
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let successful = false;
  try {
    successful = document.execCommand('copy');
  } catch (err) {
    console.warn('Fallback copy to clipboard failed:', err);
    successful = false;
  }

  document.body.removeChild(textArea);
  return successful;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  // The Clipboard API is available only in secure contexts (HTTPS) and requires user permission.
  // In some embedded environments (like this IDE), it might be blocked by a permissions policy.
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // This is not a critical error, but an expected failure in certain environments.
      // We will fall back to the legacy method.
      console.warn('Modern Clipboard API failed. This is expected in some environments. Falling back.', err);
    }
  }
  
  // Fallback for older browsers or insecure contexts.
  return fallbackCopyToClipboard(text);
};
