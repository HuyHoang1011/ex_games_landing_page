'use client';
import { useEffect, useRef } from 'react';
import { useWatch, type UseFormReturn, type FieldPath, type FieldValues } from 'react-hook-form';

import { stripHtml, clampText, extractKeywords } from '@/cores/modules/seo/utils/core-seo.util';
import { slugify } from '@/cores/modules/slugify/utils/core-slugify.util';

type UseAutoSeoOpts<T extends FieldValues> = {
  titleField?: FieldPath<T>;
  contentField?: FieldPath<T>;
  excerptField?: FieldPath<T>;

  seoTitleField?: FieldPath<T>;
  seoDescriptionField?: FieldPath<T>;
  seoSlugField?: FieldPath<T>;
  seoKeywordsField?: FieldPath<T>;

  debounceMs?: number;
  seoTitleMax?: number; // ~ 60
  seoDescMax?: number; // ~ 155
  keywordsMax?: number; // số lượng từ khoá
  enabled?: boolean;
};

export default function useGenerateSeo<T extends FieldValues>(form: UseFormReturn<T>, opts: UseAutoSeoOpts<T> = {}) {
  const {
    titleField = 'title' as FieldPath<T>,
    contentField = 'content' as FieldPath<T>,
    excerptField = 'excerpt' as FieldPath<T>,

    seoTitleField = 'seoTitle' as FieldPath<T>,
    seoDescriptionField = 'seoDescription' as FieldPath<T>,
    seoSlugField = 'seoSlug' as FieldPath<T>,
    seoKeywordsField = 'seoKeywords' as FieldPath<T>,

    debounceMs = 300,
    seoTitleMax = 60,
    seoDescMax = 155,
    keywordsMax = 10,
    enabled = true,
  } = opts;

  // Watch source fields
  const title = useWatch({ control: form.control, name: titleField });
  const content = useWatch({ control: form.control, name: contentField });
  const excerpt = useWatch({ control: form.control, name: excerptField });

  // Watch SEO fields (để biết user có điền sẵn)
  const seoTitle = useWatch({ control: form.control, name: seoTitleField });
  const seoDesc = useWatch({ control: form.control, name: seoDescriptionField });
  const seoSlug = useWatch({ control: form.control, name: seoSlugField });
  const seoKeywords = useWatch({ control: form.control, name: seoKeywordsField });

  // Flags: user đã chỉnh tay => ngừng auto
  const editedTitleRef = useRef(false);
  const editedDescRef = useRef(false);
  const editedSlugRef = useRef(false);
  const editedKeywordsRef = useRef(false);

  // Public API để field gọi khi user edit tay
  const markEdited = {
    seoTitle: () => (editedTitleRef.current = true),
    seoDescription: () => (editedDescRef.current = true),
    seoSlug: () => (editedSlugRef.current = true),
    seoKeywords: () => (editedKeywordsRef.current = true),
  };

  // Nếu có sẵn giá trị (màn edit), coi như user đã chỉnh
  useEffect(() => {
    if (seoTitle) editedTitleRef.current = true; /* once */
  }, []);
  useEffect(() => {
    if (seoDesc) editedDescRef.current = true; /* once */
  }, []);
  useEffect(() => {
    if (seoSlug) editedSlugRef.current = true; /* once */
  }, []);
  useEffect(() => {
    if (seoKeywords) editedKeywordsRef.current = true; /* once */
  }, []);

  // Auto: Title -> seoTitle
  useEffect(() => {
    if (!enabled || editedTitleRef.current) return;
    const h = setTimeout(() => {
      const next = clampText(String(title ?? ''), seoTitleMax);
      const curr = String(form.getValues(seoTitleField) ?? '');
      if (next && next !== curr) {
        form.setValue(seoTitleField, next as any, { shouldDirty: true, shouldValidate: true });
      }
    }, debounceMs);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, enabled, debounceMs, seoTitleMax]);

  // Auto: Excerpt/Content -> seoDescription
  useEffect(() => {
    if (!enabled || editedDescRef.current) return;
    const h = setTimeout(() => {
      const source = String(excerpt ?? '') || stripHtml(String(content ?? ''));
      const next = clampText(source, seoDescMax);
      const curr = String(form.getValues(seoDescriptionField) ?? '');
      if (next && next !== curr) {
        form.setValue(seoDescriptionField, next as any, { shouldDirty: true, shouldValidate: true });
      }
    }, debounceMs);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excerpt, content, enabled, debounceMs, seoDescMax]);

  // Auto: Title -> seoSlug (nếu bạn muốn auto riêng cho SEO slug, khác với slug chính)
  useEffect(() => {
    if (!enabled || editedSlugRef.current) return;
    const h = setTimeout(() => {
      const next = slugify(String(title ?? ''));
      const curr = String(form.getValues(seoSlugField) ?? '');
      if (next && next !== curr) {
        form.setValue(seoSlugField, next as any, { shouldDirty: true, shouldValidate: true });
      }
    }, debounceMs);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, enabled, debounceMs]);

  // Auto: Content/Excerpt -> seoKeywords (đơn giản: top-N freq)
  useEffect(() => {
    if (!enabled || editedKeywordsRef.current) return;
    const h = setTimeout(() => {
      const source = (
        String(title ?? '') +
        ' ' +
        String(excerpt ?? '') +
        ' ' +
        stripHtml(String(content ?? ''))
      ).trim();
      const next = extractKeywords(source, { max: keywordsMax });
      const curr = String(form.getValues(seoKeywordsField) ?? '');
      if (next && next !== curr) {
        form.setValue(seoKeywordsField, next as any, { shouldDirty: true, shouldValidate: true });
      }
    }, debounceMs);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, excerpt, content, enabled, debounceMs, keywordsMax]);

  return { markEdited };
}
