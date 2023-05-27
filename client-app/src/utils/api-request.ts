import { Auth } from 'aws-amplify';
import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
} from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || '';

export interface ApiRequestParams {
  method: Method;
  url: string;
  isPrivate?: boolean;
  data?: unknown;
  headers?: AxiosRequestHeaders;
}

export async function apiRequest<T>(
  params: ApiRequestParams,
): Promise<AxiosResponse<T> | AxiosError> {
  try {
    if (params.isPrivate) {
      const res = await Auth.currentSession();
      const token = res.getIdToken().getJwtToken();
      return await axios({
        method: params.method,
        url: `${baseUrl}${params.url}`,
        data: params.data,
        headers: {
          Authorization: `Bearer ${token}`,
          ...params.headers,
        },
      });
    }

    return await axios({
      method: params.method,
      url: `${baseUrl}${params.url}`,
      data: params.data,
      headers: params.headers,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    }
    console.error('API Request Failed: ', error);
    throw error;
  }
}
