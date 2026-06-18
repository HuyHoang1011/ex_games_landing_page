/**
 * Utility functions for content sanitization and filtering
 */

const phoneRegex = /(^|[^\d])((?:\d[\s-]?){7,}\d)(?!\d)/g;

/**
 * Replace blocked content in text with asterisks
 * @param message - The content to sanitize
 * @param forbiddenWords - Array of blocked words/phrases to replace
 * @returns Sanitized content with blocked words replaced by ***
 */
export const replaceBlockedContent = (message?: string, forbiddenWords?: string[] | null): string | undefined => {
  if (!message || !forbiddenWords?.length) {
    return message;
  }

  return forbiddenWords.reduce((acc, blockedText) => {
    if (!blockedText) {
      return acc;
    }

    const escapedBlockedText = blockedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blockRegex = new RegExp(escapedBlockedText, 'gi');

    return acc.replace(blockRegex, '***');
  }, message);
};

/**
 * Mask phone numbers in content, keeping only last 3 digits visible
 * @param content - The content to mask phone numbers in
 * @returns Content with phone numbers masked
 */
export const maskPhoneNumbers = (content?: any): string | undefined => {
  if (!content) {
    return content;
  }

  return content.replace(phoneRegex, (match: any, prefix: any, number: any) => {
    const digitsOnly = number.replace(/\D/g, '');

    if (digitsOnly.length < 9) {
      return match;
    }

    const maskedDigits = `${digitsOnly.slice(0, -3)}***`;
    let index = 0;

    const rebuiltNumber = number.replace(/\d/g, () => maskedDigits[index++] ?? '*');

    return `${prefix ?? ''}${rebuiltNumber}`;
  });
};

/**
 * Sanitize content by applying blocked content replacement and phone number masking
 * Only applies to non-admin/non-cskh users
 * @param content - The content to sanitize
 * @param forbiddenWords - Array of blocked words/phrases
 * @param userRole - The role of the current user
 * @param adminRoles - Array of roles that should see unsanitized content
 * @returns Sanitized content or original content for admin/cskh users
 */
export const sanitizeContent = (
  content?: string,
  forbiddenWords?: string[] | null,
  userRole?: string,
  adminRoles: string[] = ['admin', 'cskh'],
): string | undefined => {
  if (!content) {
    return content;
  }

  // Admin and CSKH users see original content
  if (userRole && adminRoles.includes(userRole)) {
    return content;
  }

  // Apply blocked content replacement and phone masking for regular users
  return maskPhoneNumbers(replaceBlockedContent(content, forbiddenWords));
};
