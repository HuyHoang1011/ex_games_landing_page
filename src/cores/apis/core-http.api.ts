import { CORE_ENV } from '@/cores/configs/core-env.config';
import { CORE_SETTING } from '@/cores/configs/core-setting.config';
import { getQueryString } from '@/cores/utils/api.util';
import { type TransAppBeResponseType } from '@/i18n/types/language.type';
import { authUtil } from '@/modules/app/auth/utils/auth.util';

export type ParamsType = {
  [key: string]: any;
};

export interface IPagination {
  page: number;
  limit: number;
  total_pages: number;
  total_records: number;
  isHasPrev?: boolean;
  isHasNext?: boolean;
}

export type ResponseType<T> = {
  status_code: number;
  code: TransAppBeResponseType;
  message: string;
  element?: T;
};

export type ResponsePaginationType<T> = ResponseType<T> & {
  meta: IPagination;
};

export type ServerFetcher<T> = (params: ParamsType) => Promise<ResponsePaginationType<T>>;

export type CoreTableFilter = {
  type: 'select';
  paramKey: string; // ví dụ: 'status'
  placeholder?: string;
  options: { label: string; value: string }[];
};

class CoreHttp {
  public readonly baseUrl: string;
  private readonly defaultHeaders: HeadersInit;
  private readonly timeout: number;

  constructor(baseURL: string, timeout: number = 20000) {
    this.baseUrl = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async fetchWithTimeout(
    input: RequestInfo,
    init?: RequestInit,
    timeout: number = this.timeout,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  }

  private getAuthHeaders = (): Partial<HeadersInit | undefined> => {
    const accessToken = authUtil.getAccessToken();

    if (!accessToken) return {};

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  };

  public async request<T>(
    url: string,
    requestInit: RequestInit = {},
    options?: {
      requestTimeout: number;
      skipDefaultHeaders: boolean;
    },
  ): Promise<T> {
    const isFullUrl = /^https?:\/\//.test(url);
    const fullUrl = isFullUrl ? url : `${this.baseUrl}${url}`;

    const headers = {
      ...(options?.skipDefaultHeaders ? {} : this.defaultHeaders),
      ...this.getAuthHeaders(),
      ...requestInit.headers,
    };

    const response = await this.fetchWithTimeout(
      fullUrl,
      {
        ...requestInit,
        headers,
      },
      options?.requestTimeout,
    );

    return this.handleResponse<T>(response);
  }

  public async get<T>(
    url: string,
    params?: ParamsType,
    headers: HeadersInit = {},
    options?: {
      requestTimeout: number;
      skipDefaultHeaders: boolean;
    },
  ) {
    return this.request<T>(`${url}${getQueryString(params)}`, { method: 'GET', headers }, options);
  }

  public async post<T>(url: string, body?: any, headers: HeadersInit = {}, requestTimeout?: number): Promise<T> {
    const isFormData = body instanceof FormData;
    return this.request<T>(
      url,
      {
        method: 'POST',
        body: isFormData ? body : JSON.stringify(body),
        headers,
      },
      {
        requestTimeout: requestTimeout ?? this.timeout,
        skipDefaultHeaders: isFormData,
      },
    );
  }

  public async patch<T>(
    url: string,
    params?: ParamsType,
    body?: any,
    headers: HeadersInit = {},
    requestTimeout: number = CORE_SETTING.OTHER.REQUEST_TIMEOUT,
  ): Promise<T> {
    const isFormData = body instanceof FormData;
    const requestBody = isFormData ? body : JSON.stringify(body);

    return this.request<T>(
      `${url}${getQueryString(params)}`,
      {
        method: 'PATCH',
        body: requestBody,
        headers,
      },
      {
        requestTimeout: requestTimeout ?? this.timeout,
        skipDefaultHeaders: isFormData,
      },
    );
  }

  public async put<T>(
    url: string,
    params?: ParamsType,
    body?: any,
    headers: HeadersInit = {},
    requestTimeout: number = CORE_SETTING.OTHER.REQUEST_TIMEOUT,
  ): Promise<T> {
    return this.request<T>(
      `${url}${getQueryString(params)}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers,
      },
      {
        requestTimeout: requestTimeout ?? this.timeout,
        skipDefaultHeaders: false,
      },
    );
  }

  public async delete<T>(
    url: string,
    params?: ParamsType,
    body?: any,
    headers: HeadersInit = {},
    requestTimeout: number = CORE_SETTING.OTHER.REQUEST_TIMEOUT,
  ): Promise<T> {
    return this.request<T>(
      `${url}${getQueryString(params)}`,
      {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers,
      },
      {
        requestTimeout: requestTimeout ?? this.timeout,
        skipDefaultHeaders: false,
      },
    );
  }

  public async export(
    url: string,
    params?: ParamsType,
    body?: any,
    fileNameOrOptions?:
      | string
      | {
          fileName?: string; // ? tên file xuất ra, ex: 'users.xlsx'
          method?: 'GET' | 'POST';
          headers?: HeadersInit;
        },
  ): Promise<void> {
    const method = typeof fileNameOrOptions === 'object' ? (fileNameOrOptions.method ?? 'GET') : 'GET';
    const options = typeof fileNameOrOptions === 'object' ? fileNameOrOptions : undefined;
    const customFileName = typeof fileNameOrOptions === 'string' ? fileNameOrOptions : options?.fileName;

    const fullUrl = `${this.baseUrl}${url}${getQueryString(params)}`;
    const accessToken = authUtil.getAccessToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options?.headers,
    };

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Export failed: ${text}`);
    }

    // ? format ngày tháng năm hiện tại
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN').replaceAll('/', '-'); // => 11-11-2025

    // ? nối ngày vào tên file (nếu chưa có)
    const fileName = customFileName ? customFileName.replace('.xlsx', `_${dateStr}.xlsx`) : `export_${dateStr}.xlsx`;

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  }
}

const coreHttp = new CoreHttp(CORE_ENV.BASE_URL.API);
export const coreHttpAbcVip = new CoreHttp(CORE_ENV.BASE_URL.API_ABCVIP);
export const coreHttpAbc1Tv = new CoreHttp(CORE_ENV.BASE_URL.API_ABC1TV);
export const coreHttpChat = new CoreHttp(CORE_ENV.BASE_URL.BACKEND ?? '');

export default coreHttp;
