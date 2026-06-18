'use client';

import { useEffect, useRef } from 'react';
import { useWatch, type UseFormReturn, type FieldPath, type FieldValues } from 'react-hook-form';

import { slugify } from '@/cores/modules/slugify/utils/core-slugify.util';

type UseAutoSlugOpts<TFieldValues extends FieldValues> = {
  /** default 'title' */
  titleField?: FieldPath<TFieldValues>;
  /** default 'slug' */
  slugField?: FieldPath<TFieldValues>;
  /** default 300ms */
  debounceMs?: number;
  /** optional max length for slug */
  maxLength?: number;
  /** enable/disable auto-slug, default true */
  enabled?: boolean;
};

export default function useGenerateSlug<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  opts: UseAutoSlugOpts<TFieldValues> = {},
) {
  const {
    titleField = 'title' as FieldPath<TFieldValues>,
    slugField = 'slug' as FieldPath<TFieldValues>,
    debounceMs = 300,
    maxLength,
    enabled = true,
  } = opts;

  // ? Nếu user đã gõ slug thủ công thì không auto
  const userEditedSlugRef = useRef(false);

  const title = useWatch<TFieldValues>({ control: form.control, name: titleField });
  const slug = useWatch<TFieldValues>({ control: form.control, name: slugField });

  // ? Gọi khi user tự sửa slug để "tắt" auto
  const markSlugEdited = () => {
    userEditedSlugRef.current = true;
  };

  // ? Tự động sinh slug khi title đổi (nếu chưa bị user sửa slug)
  useEffect(() => {
    if (!enabled) return;
    if (userEditedSlugRef.current) return;

    const h = setTimeout(() => {
      const next = slugify(String(title ?? ''), { maxLength });
      const curr = String(form.getValues(slugField) ?? '');
      if (curr !== next) {
        form.setValue(slugField, next as any, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }, debounceMs);

    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, enabled, debounceMs, maxLength]);

  // ? Nếu slug có sẵn (màn edit), coi như user đã sửa -> không auto
  useEffect(() => {
    if (slug) userEditedSlugRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { markSlugEdited };
}
