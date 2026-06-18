import { useEffect, useState } from 'react';

/**
 * useCopyText
 * * Using copy the text
 * * Usaged: const { isCopied, handleCopy } = useCopyText('abc');
 * @param text string
 * @return { isCopied, handleCopy }
 */
export const useCopyText = (text: string) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      // toast.success(tMessage('$action_success', { action: tAction('copy') }));
    } catch (err) {
      console.error('Copy error');
    }
  };

  return { isCopied, handleCopy };
};
