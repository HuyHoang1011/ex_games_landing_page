import coreHttp, { type ParamsType, type ResponsePaginationType, type ResponseType } from '@/cores/apis/core-http.api';
import { type CoreIdType } from '@/cores/types/core-type.type';

type KeyType = 'getAll' | 'getDetail' | 'other';

export class CoreApi<TGet = unknown, TBody = unknown, TPatch = unknown, TPut = unknown> {
  protected endpoint: string;
  protected key: string;
  protected subKey: string = '';
  protected http: typeof coreHttp;

  constructor(endpoint: string, http: typeof coreHttp = coreHttp) {
    const validEndpoint = endpoint?.startsWith('/') ? endpoint.slice(1) : endpoint;
    this.endpoint = `/${validEndpoint}`;
    this.key = endpoint;
    this.http = http;
  }

  setSubKey(subKey: string) {
    this.subKey = subKey;
  }

  getKey(type: KeyType = 'getAll', params?: ParamsType, subKey?: string): [] {
    let keyArrays: Array<ParamsType | string | undefined> = [];

    if (subKey) this.setSubKey(subKey);

    switch (type) {
      case 'getAll':
      case 'getDetail':
        keyArrays = [this.key, type, this.convertParamsToArray(params)?.join(', ')];
        break;
      case 'other':
        keyArrays = [this.key, type, this.subKey, this.convertParamsToArray(params)?.join(', ')];
        break;
      default:
        break;
    }

    return keyArrays as [];
  }

  getUrl(path: string): string {
    const validPath = path.startsWith('/') ? path.slice(1) : path;
    return `${this.endpoint}/${validPath}`;
  }

  async getAll(params?: ParamsType): Promise<ResponsePaginationType<TGet[]>> {
    return this.http.get(this.endpoint, params);
  }

  async getDetail(id: string, params?: ParamsType): Promise<ResponseType<TGet>> {
    return this.http.get(`${this.endpoint}/${id}`, params);
  }

  async post(data: TBody, options?: { params?: ParamsType; headers?: HeadersInit }): Promise<ResponseType<TGet>> {
    return this.http.post(`${this.endpoint}`, data, options?.headers);
  }

  // ? Backend không dùng PUT
  // async put(
  //   id: string,
  //   data: TPut,
  //   options?: { params?: ParamsType; headers?: HeadersInit },
  // ): Promise<ResponseType<TGet>> {
  //   return this.http.put(`${this.endpoint}/${id}`, options?.params, data, options?.headers);
  // }

  async patch(
    id: string,
    data: TPatch,
    options?: { params?: ParamsType; headers?: HeadersInit },
  ): Promise<ResponseType<TGet>> {
    return this.http.patch(`${this.endpoint}/${id}`, options?.params, data, options?.headers);
  }

  async delete(id: CoreIdType, options?: { params?: ParamsType; headers?: HeadersInit }): Promise<ResponseType<TGet>> {
    return this.http.delete(`${this.endpoint}/${id}`, options?.params, undefined, options?.headers);
  }

  async upload(data: TBody, options?: { params?: ParamsType; headers?: HeadersInit }): Promise<ResponseType<TGet[]>> {
    return this.http.post(`${this.endpoint}/upload`, data, options?.headers);
  }

  public convertParamsToArray(params?: ParamsType): string[] {
    if (!params || Object.keys(params)?.length === 0) {
      return [];
    }

    return Object.entries(params).map(([key, value]) => `${key}_${value}`);
  }
}
