import { z } from 'zod';

import { CORE_SETTING } from '@/cores/configs/core-setting.config';
import { type TFormType } from '@/i18n/types/language.type';

export default function getCoreSchemaValidation(tForm: TFormType) {
  const baseSchema = z.object({
    username: z
      .string({
        message: tForm('required_input_$field', { field: tForm('username') }),
      })
      .trim()
      .min(CORE_SETTING.RULE.FORM.MIN_LENGTH_GENERAL, {
        message: tForm('required_input_$field', { field: tForm('username') }),
      }),
    login_name: z
      .string({
        message: tForm('required_input_$field', { field: tForm('username') }),
      })
      .trim()
      .min(CORE_SETTING.RULE.FORM.MIN_LENGTH_GENERAL, {
        message: tForm('required_input_$field', { field: tForm('username') }),
      }),
    identifier: z.string().min(CORE_SETTING.RULE.FORM.MIN_LENGTH_GENERAL, {
      message: tForm('required_input_$field', { field: tForm('account') }),
    }),
    name: z
      .string({
        message: tForm('required_input_$field', { field: tForm('full_name') }),
      })
      .trim()
      .min(CORE_SETTING.RULE.FORM.MIN_LENGTH_GENERAL, {
        message: tForm('required_input_$field', { field: tForm('full_name') }),
      }),
    email: z
      .string({ message: tForm('required_input_$field', { field: 'Email' }) })
      .min(CORE_SETTING.RULE.FORM.MIN_LENGTH_GENERAL, { message: tForm('required_input_$field', { field: 'Email' }) })
      .email({ message: tForm('invalid_format_$field', { field: 'Email' }) }),
    password: z
      .string()
      .min(CORE_SETTING.RULE.FORM.MIN_LENGTH_PASSWORD, {
        message: tForm('$field_$min', {
          field: tForm('password'),
          min: `${CORE_SETTING.RULE.FORM.MIN_LENGTH_PASSWORD}`,
        }),
      })
      .max(CORE_SETTING.RULE.FORM.MAX_LENGTH_PASSWORD, {
        message: tForm('$field_$max', {
          field: tForm('password'),
          max: `${CORE_SETTING.RULE.FORM.MAX_LENGTH_PASSWORD}`,
        }),
      }),
    new_password: z
      .string({
        message: tForm('required_input_$field', { field: tForm('new_password') }),
      })
      .min(CORE_SETTING.RULE.FORM.MIN_LENGTH_PASSWORD, {
        message: tForm('$field_$min', {
          field: tForm('new_password'),
          min: `${CORE_SETTING.RULE.FORM.MIN_LENGTH_PASSWORD}`,
        }),
      })
      .max(CORE_SETTING.RULE.FORM.MAX_LENGTH_PASSWORD, {
        message: tForm('$field_$max', {
          field: tForm('new_password'),
          max: `${CORE_SETTING.RULE.FORM.MAX_LENGTH_PASSWORD}`,
        }),
      }),
    password_confirmation: z
      .string({
        message: tForm('required_input_$field', { field: tForm('password_confirmation') }),
      })
      .min(CORE_SETTING.RULE.FORM.MIN_LENGTH_PASSWORD, {
        message: tForm('$field_$min', {
          field: tForm('password_confirmation'),
          min: `${CORE_SETTING.RULE.FORM.MIN_LENGTH_PASSWORD}`,
        }),
      })
      .max(CORE_SETTING.RULE.FORM.MAX_LENGTH_PASSWORD, {
        message: tForm('$field_$max', {
          field: tForm('password_confirmation'),
          max: `${CORE_SETTING.RULE.FORM.MAX_LENGTH_PASSWORD}`,
        }),
      }),

    phone: z
      .string({
        message: tForm('required_input_$field', { field: tForm('phone') }),
      })
      .min(10, { message: tForm('$field_$min', { min: '10', field: tForm('phone') }) })
      .max(11, { message: tForm('$field_$max', { max: '11', field: tForm('phone') }) })
      .regex(/^(0|\+84)(\d{9,10})$/, {
        message: tForm('invalid_format_$field', { field: tForm('phone') }),
      }),

    phone_number: z
      .string({
        message: tForm('required_input_$field', { field: tForm('phone') }),
      })
      .min(10, { message: tForm('$field_$min', { min: '10', field: tForm('phone') }) })
      .max(11, { message: tForm('$field_$max', { max: '11', field: tForm('phone') }) })
      .regex(/^(0|\+84)(\d{9,10})$/, {
        message: tForm('invalid_format_$field', { field: tForm('phone') }),
      }),
  });

  return {
    schema: baseSchema,
  };
}
