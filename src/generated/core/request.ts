/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */ 

import * as FormData from 'form-data';
import fetch, { BodyInit, Headers, RequestInit, Response } from 'node-fetch';
import { types } from 'util';
import { invariant } from '../../utils/invariant';

import { ApiError } from './ApiError';
import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';
import { OpenAPI } from './OpenAPI';

function isDefined<T>(value: T | null | undefined): value is Exclude<T, null | undefined> {
  return value !== undefined && value !== null;
}

function isString(value: any): value is string {
  return typeof value === 'string';
}

function isBinary(value: any): value is Buffer | ArrayBuffer | ArrayBufferView {
  const isBuffer = Buffer.isBuffer(value);
  const isArrayBuffer = types.isArrayBuffer(value);
  const isArrayBufferView = types.isArrayBufferView(value);
  return isBuffer || isArrayBuffer || isArrayBufferView;
}

function getQueryString(params: Record<string, any>): string {
  const qs: string[] = [];
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((value) => {
          qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
        });
      } else {
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    }
  });
  if (qs.length > 0) {
    return `?${qs.join('&')}`;
  }
  return '';
}

function getUrl(options: ApiRequestOptions): string {
  const path = options.path.replace(/[:]/g, '_');
  const url = `${OpenAPI.BASE}${path}`;

  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
}

function getFormData(params: Record<string, any>): FormData {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (isDefined(value)) {
      formData.append(key, value);
    }
  });
  return formData;
}

async function getToken(): Promise<string> {
  let token = typeof OpenAPI.TOKEN === 'function' ? await OpenAPI.TOKEN() : OpenAPI.TOKEN;
  const username =
    (typeof OpenAPI.USERNAME === 'function' ? await OpenAPI.USERNAME() : OpenAPI.USERNAME) || '0';

  if (typeof token !== 'string') {
    invariant(token.token, 'Not able to set token');
    token = token.token
  }

  return token && `Basic ${btoa(`${username}:${token}`)}`;
}

async function getHeaders(options: ApiRequestOptions): Promise<Headers> {
  const headers = new Headers({
    Accept: 'application/json',
    ...options.headers,
  });

  const authHeader = await getToken();
  if (isDefined(authHeader) && authHeader !== '') {
    headers.append('Authorization', authHeader);
  }

  if (options.body) {
    if (isBinary(options.body)) {
      headers.append('Content-Type', 'application/octet-stream');
    } else if (isString(options.body)) {
      headers.append('Content-Type', 'text/plain');
    } else {
      headers.append('Content-Type', 'application/json');
    }
  }
  return headers;
}

function getRequestBody(options: ApiRequestOptions): BodyInit | undefined {
  if (options.formData) {
    return getFormData(options.formData);
  }
  if (options.body) {
    if (isString(options.body) || isBinary(options.body)) {
      return options.body;
    } else {
      return JSON.stringify(options.body);
    }
  }
  return undefined;
}

async function sendRequest(options: ApiRequestOptions, url: string): Promise<Response> {
  const request: RequestInit = {
    method: options.method,
    headers: await getHeaders(options),
    body: getRequestBody(options),
  };
  return await fetch(url, request);
}

function getResponseHeader(response: Response, responseHeader?: string): string | null {
  if (responseHeader) {
    const content = response.headers.get(responseHeader);
    if (isString(content)) {
      return content;
    }
  }
  return null;
}

async function getResponseBody(response: Response): Promise<any> {
  try {
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
      const isJSON = contentType.toLowerCase().startsWith('application/json');
      if (isJSON) {
        return await response.json();
      } else {
        return await response.text();
      }
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

function catchErrors(options: ApiRequestOptions, result: ApiResult): void {
  const errors: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    ...options.errors,
  };

  const error = errors[result.status];
  if (error) {
    throw new ApiError(result, error);
  }

  if (!result.ok) {
    throw new ApiError(result, 'Generic Error');
  }
}

/**
 * Request using node-fetch client
 * @param options The request options from the the service
 * @result ApiResult
 * @throws ApiError
 */
export async function request(options: ApiRequestOptions): Promise<ApiResult> {
  const url = getUrl(options);
  const response = await sendRequest(options, url);
  const responseBody = await getResponseBody(response);
  const responseHeader = getResponseHeader(response, options.responseHeader);

  const result: ApiResult = {
    url,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    body: responseHeader || responseBody,
  };

  catchErrors(options, result);
  return result;
}
