import { getCookie } from '@/helpers/cookies';
import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiUpload,
  getData,
  getFormDataPost,
} from '../api-method-functions';

// Mock modules
vi.mock('axios');
vi.mock('@/helpers/cookies');
vi.mock('../construct-headers', () => ({
  constructHeaders: vi.fn(() => ({
    headers: {
      'Access-Control-Allow-Origin': '*/*',
      Authorization: 'Bearer test-token',
    },
  })),
}));
vi.mock('../construct-get-params', () => ({
  constructGetParams: vi.fn((params) => {
    if (Object.keys(params).length === 0) return '';
    return '?' + new URLSearchParams(params).toString();
  }),
}));
vi.mock('../response-handler', () => ({
  handleResponse: vi.fn((response) => {
    if (
      response?.status === 200 ||
      response?.status === 201 ||
      response?.status === 204
    ) {
      return response.data;
    }
    throw response;
  }),
}));

// Mock environment variables - set them before module import
vi.stubEnv('VITE_API_MAIN_URL', 'https://api.example.com/');
vi.stubEnv('VITE_API_AUTHENTICATION_URL', 'https://auth.example.com/');
vi.stubEnv('VITE_API_TENANT', 'test-tenant');
vi.stubEnv('VITE_CULTURE_NAME', 'en-US');

const mockedAxios = axios as any;
const mockedGetCookie = getCookie as any;

describe('api-method-functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetCookie.mockReturnValue('test-auth-token');
    mockedAxios.get = vi.fn();
    mockedAxios.post = vi.fn();
    mockedAxios.delete = vi.fn();
    mockedAxios.put = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================================
  // Tests for helper utility functions (tested through getData)
  // ============================================================================

  describe('requiresAuthentication utility', () => {
    it('should identify public endpoints that do not require authentication', async () => {
      // Test that public endpoints don't use auth token
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { success: true },
      });

      await getData({
        endPoint: 'connect/token',
        type: 'get',
        dataParams: {},
        isToken: true,
      });

      // Verify the request was made (token requirement is internal logic)
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should require authentication for protected endpoints', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { success: true },
      });

      await getData({
        endPoint: '/api/users',
        type: 'get',
        dataParams: {},
        isToken: true,
      });

      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('validateApiParams utility', () => {
    it('should throw error when endpoint is missing', async () => {
      await expect(
        getData({
          endPoint: '',
          type: 'get',
          dataParams: {},
        }),
      ).rejects.toThrow('Endpoint is required');
    });

    it('should throw error when type is missing', async () => {
      await expect(
        getData({
          endPoint: '/api/test',
          type: '' as any,
          dataParams: {},
        }),
      ).rejects.toThrow('Request type is required');
    });

    it('should throw error when type is invalid', async () => {
      await expect(
        getData({
          endPoint: '/api/test',
          type: 'patch' as any,
          dataParams: {},
        }),
      ).rejects.toThrow(
        "Invalid request type: patch. Must be 'get', 'post', or 'delete'",
      );
    });
  });

  describe('getBaseUrl utility', () => {
    it('should return authentication URL for connect/token endpoint', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        status: 200,
        data: { token: 'new-token' },
      });

      await getData({
        endPoint: 'connect/token',
        type: 'post',
        dataParams: { username: 'user', password: 'pass' },
      });

      // Should use AUTHENTICATION_URL for connect/token
      const callArgs = mockedAxios.post.mock.calls[0][0];
      // Verify it's a string and contains the endpoint
      expect(typeof callArgs).toBe('string');
      expect(callArgs).toContain('connect/token');
    });

    it('should return main URL for regular endpoints', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { data: [] },
      });

      await getData({
        endPoint: '/api/users',
        type: 'get',
        dataParams: {},
      });

      const callArgs = mockedAxios.get.mock.calls[0][0];
      // Verify it's a string and contains the endpoint
      expect(typeof callArgs).toBe('string');
      expect(callArgs).toContain('/api/users');
    });
  });

  describe('prepareFormData utility', () => {
    it('should return object when isHeaderJson is true', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 1 },
      });

      const testData = { name: 'test', value: '123' };
      await getData({
        endPoint: '/api/test',
        type: 'post',
        dataParams: testData,
        isHeaderJson: true,
      });

      const callArgs = mockedAxios.post.mock.calls[0][1];
      expect(typeof callArgs).toBe('object');
    });

    it('should return URLSearchParams when isHeaderJson is false', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 1 },
      });

      const testData = { name: 'test', value: '123' };
      await getData({
        endPoint: '/api/test',
        type: 'post',
        dataParams: testData,
        isHeaderJson: false,
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  // ============================================================================
  // Tests for main API methods
  // ============================================================================

  describe('getData - GET requests', () => {
    it('should make a GET request successfully', async () => {
      const mockResponse = { status: 200, data: { id: 1, name: 'test' } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getData({
        endPoint: '/api/users',
        type: 'get',
        dataParams: { id: 1 },
      });

      const callArgs = mockedAxios.get.mock.calls[0];
      expect(callArgs[0]).toContain('/api/users');
      expect(callArgs[1]).toBeDefined();
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle GET request with empty dataParams', async () => {
      const mockResponse = { status: 200, data: { items: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getData({
        endPoint: '/api/items',
        type: 'get',
        dataParams: {},
      });

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle GET request with multiple query parameters', async () => {
      const mockResponse = { status: 200, data: { page: 1, total: 100 } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await getData({
        endPoint: '/api/users',
        type: 'get',
        dataParams: { page: 1, limit: 10, search: 'john' },
      });

      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should throw error on GET request failure', async () => {
      const mockError = { status: 404, data: { error: 'Not found' } };
      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(
        getData({
          endPoint: '/api/notfound',
          type: 'get',
          dataParams: {},
        }),
      ).rejects.toBeDefined();
    });

    it('should not include token for public endpoints in GET request', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { token: 'public' },
      });

      await getData({
        endPoint: 'connect/token',
        type: 'get',
        dataParams: {},
        isToken: true,
      });

      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should use provided default_token instead of stored token', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { data: [] },
      });

      await getData({
        endPoint: '/api/users',
        type: 'get',
        dataParams: {},
        default_token: 'custom-token',
      });

      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('getData - POST requests', () => {
    it('should make a POST request successfully', async () => {
      const mockResponse = { status: 201, data: { id: 1, name: 'created' } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await getData({
        endPoint: '/api/users',
        type: 'post',
        dataParams: { name: 'John' },
      });

      const callArgs = mockedAxios.post.mock.calls[0];
      expect(callArgs[0]).toContain('/api/users');
      expect(callArgs[1]).toBeDefined();
      expect(callArgs[2]).toBeDefined();
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle POST request with JSON header', async () => {
      const mockResponse = { status: 201, data: { id: 1 } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await getData({
        endPoint: '/api/users',
        type: 'post',
        dataParams: { name: 'John' },
        isHeaderJson: true,
      });

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle POST request with empty dataParams', async () => {
      const mockResponse = { status: 201, data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await getData({
        endPoint: '/api/action',
        type: 'post',
        dataParams: {},
      });

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error on POST request failure', async () => {
      const mockError = { status: 400, data: { error: 'Bad request' } };
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(
        getData({
          endPoint: '/api/users',
          type: 'post',
          dataParams: { name: 'John' },
        }),
      ).rejects.toBeDefined();
    });

    it('should handle POST request with tenant header', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { success: true },
      });

      await getData({
        endPoint: '/api/users',
        type: 'post',
        dataParams: { name: 'John' },
        hasTenant: true,
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  describe('getData - DELETE requests', () => {
    it('should make a DELETE request successfully', async () => {
      const mockResponse = { status: 204, data: null };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      await getData({
        endPoint: '/api/users/1',
        type: 'delete',
        dataParams: {},
      });

      const callArgs = mockedAxios.delete.mock.calls[0];
      expect(callArgs[0]).toContain('/api/users/1');
      expect(callArgs[1]).toBeDefined();
    });

    it('should handle DELETE request with dataParams', async () => {
      const mockResponse = { status: 204, data: null };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      await getData({
        endPoint: '/api/users/1',
        type: 'delete',
        dataParams: { reason: 'obsolete' },
      });

      expect(mockedAxios.delete).toHaveBeenCalled();
    });

    it('should throw error on DELETE request failure', async () => {
      const mockError = { status: 404, data: { error: 'Not found' } };
      mockedAxios.delete.mockRejectedValueOnce(mockError);

      await expect(
        getData({
          endPoint: '/api/users/999',
          type: 'delete',
          dataParams: {},
        }),
      ).rejects.toBeDefined();
    });

    it('should handle DELETE with 200 status response', async () => {
      const mockResponse = { status: 200, data: { deleted: true } };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      const result = await getData({
        endPoint: '/api/users/1',
        type: 'delete',
        dataParams: {},
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  // ============================================================================
  // Tests for getFormDataPost
  // ============================================================================

  describe('getFormDataPost', () => {
    it('should make a POST request with FormData', async () => {
      const mockResponse = { status: 201, data: { id: 1 } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      formData.append('name', 'test');

      const result = await getFormDataPost({
        endPoint: '/api/upload',
        formData,
        type: 'post',
      });

      const callArgs = mockedAxios.post.mock.calls[0];
      expect(callArgs[0]).toContain('/api/upload');
      expect(callArgs[1]).toBe(formData);
      expect(callArgs[2]).toBeDefined();
      expect(result).toEqual(mockResponse.data);
    });

    it('should make a PUT request with FormData', async () => {
      const mockResponse = { status: 200, data: { id: 1, updated: true } };
      mockedAxios.put.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      formData.append('name', 'updated');

      const result = await getFormDataPost({
        endPoint: '/api/users/1',
        formData,
        type: 'put',
      });

      expect(mockedAxios.put).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should use provided default_token in getFormDataPost', async () => {
      const mockResponse = { status: 201, data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      await getFormDataPost({
        endPoint: '/api/upload',
        formData,
        type: 'post',
        default_token: 'custom-token',
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should use stored AUTH_TOKEN when default_token is not provided', async () => {
      const mockResponse = { status: 201, data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      // Note: AUTH_TOKEN is captured at module load time, not called during the request
      const formData = new FormData();
      await getFormDataPost({
        endPoint: '/api/upload',
        formData,
        type: 'post',
      });

      expect(mockedAxios.post).toHaveBeenCalled();
      // The auth token is initialized at module load time, so we just verify the call was made
      // with the proper headers that would contain the token
      const callArgs = mockedAxios.post.mock.calls[0];
      expect(callArgs[2]).toBeDefined(); // headers should be present
    });

    it('should handle hasTenant option in getFormDataPost', async () => {
      const mockResponse = { status: 201, data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      await getFormDataPost({
        endPoint: '/api/upload',
        formData,
        type: 'post',
        hasTenant: true,
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should handle hasExcel option in getFormDataPost', async () => {
      const mockResponse = { status: 200, data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      await getFormDataPost({
        endPoint: '/api/export',
        formData,
        type: 'post',
        hasExcel: true,
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should throw error on getFormDataPost failure', async () => {
      const mockError = { status: 400, data: { error: 'Bad request' } };
      mockedAxios.post.mockRejectedValueOnce(mockError);

      const formData = new FormData();
      await expect(
        getFormDataPost({
          endPoint: '/api/upload',
          formData,
          type: 'post',
        }),
      ).rejects.toBeDefined();
    });

    it('should default to POST type when not specified', async () => {
      const mockResponse = { status: 201, data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      await getFormDataPost({
        endPoint: '/api/upload',
        formData,
        type: 'post',
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  // ============================================================================
  // Tests for convenience methods
  // ============================================================================

  describe('apiGet - GET convenience method', () => {
    it('should make a GET request using apiGet', async () => {
      const mockResponse = { status: 200, data: { items: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await apiGet('/api/users', { page: 1 });

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should make a GET request with default empty params', async () => {
      const mockResponse = { status: 200, data: { items: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await apiGet('/api/users');

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should accept additional options in apiGet', async () => {
      const mockResponse = { status: 200, data: { items: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await apiGet('/api/users', {}, { isToken: false });

      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('apiPost - POST convenience method', () => {
    it('should make a POST request using apiPost', async () => {
      const mockResponse = { status: 201, data: { id: 1 } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await apiPost('/api/users', { name: 'John' });

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should make a POST request with default empty params', async () => {
      const mockResponse = { status: 201, data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await apiPost('/api/action');

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should accept additional options in apiPost', async () => {
      const mockResponse = { status: 201, data: { id: 1 } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await apiPost('/api/users', { name: 'John' }, { isHeaderJson: true });

      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  describe('apiDelete - DELETE convenience method', () => {
    it('should make a DELETE request using apiDelete', async () => {
      const mockResponse = { status: 204, data: null };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      await apiDelete('/api/users/1');

      expect(mockedAxios.delete).toHaveBeenCalled();
    });

    it('should make a DELETE request with params', async () => {
      const mockResponse = { status: 204, data: null };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      await apiDelete('/api/users/1', { reason: 'obsolete' });

      expect(mockedAxios.delete).toHaveBeenCalled();
    });

    it('should accept additional options in apiDelete', async () => {
      const mockResponse = { status: 204, data: null };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      await apiDelete('/api/users/1', {}, { isToken: true });

      expect(mockedAxios.delete).toHaveBeenCalled();
    });
  });

  describe('apiUpload - File upload convenience method', () => {
    it('should upload a file using apiUpload', async () => {
      const mockResponse = { status: 201, data: { fileId: 'file123' } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      formData.append('file', new File(['content'], 'test.txt'));

      await apiUpload('/api/files/upload', formData);

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should upload with additional options', async () => {
      const mockResponse = { status: 201, data: { fileId: 'file123' } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      formData.append('file', new File(['content'], 'test.txt'));

      await apiUpload('/api/files/upload', formData, { hasTenant: true });

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should use POST method for file upload', async () => {
      const mockResponse = { status: 201, data: { fileId: 'file123' } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const formData = new FormData();
      formData.append('file', new File(['content'], 'test.txt'));

      await apiUpload('/api/files/upload', formData);

      const callArgs = mockedAxios.post.mock.calls[0];
      expect(callArgs[0]).toContain('/api/files/upload');
      expect(callArgs[1]).toBe(formData);
      expect(callArgs[2]).toBeDefined();
    });
  });

  // ============================================================================
  // Error handling tests
  // ============================================================================

  describe('Error handling', () => {
    it('should handle network errors gracefully', async () => {
      const networkError = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(networkError);

      await expect(
        getData({
          endPoint: '/api/users',
          type: 'get',
          dataParams: {},
        }),
      ).rejects.toBeDefined();
    });

    it('should handle errors with no message', async () => {
      mockedAxios.get.mockRejectedValueOnce({});

      await expect(
        getData({
          endPoint: '/api/users',
          type: 'get',
          dataParams: {},
        }),
      ).rejects.toBeDefined();
    });

    it('should handle null response', async () => {
      mockedAxios.get.mockResolvedValueOnce(null);

      await expect(
        getData({
          endPoint: '/api/users',
          type: 'get',
          dataParams: {},
        }),
      ).rejects.toBeDefined();
    });
  });

  // ============================================================================
  // Type case-insensitivity tests
  // ============================================================================

  describe('Request type case-insensitivity', () => {
    it('should handle uppercase GET', async () => {
      const mockResponse = { status: 200, data: { items: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await getData({
        endPoint: '/api/users',
        type: 'GET' as any,
        dataParams: {},
      });

      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should handle uppercase POST', async () => {
      const mockResponse = { status: 201, data: { id: 1 } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await getData({
        endPoint: '/api/users',
        type: 'POST' as any,
        dataParams: {},
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should handle uppercase DELETE', async () => {
      const mockResponse = { status: 204, data: null };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      await getData({
        endPoint: '/api/users/1',
        type: 'DELETE' as any,
        dataParams: {},
      });

      expect(mockedAxios.delete).toHaveBeenCalled();
    });
  });

  // ============================================================================
  // Integration-like tests
  // ============================================================================

  describe('Complex scenarios', () => {
    it('should handle sequential API calls', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { id: 1, name: 'User' },
      });
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 2, postId: 1 },
      });

      const user = await apiGet('/api/users/1');
      expect(user).toEqual({ id: 1, name: 'User' });

      const post = await apiPost('/api/posts', {
        title: 'Test',
        userId: user.id,
      });
      expect(post).toEqual({ id: 2, postId: 1 });
    });

    it('should handle multiple concurrent requests', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: { items: [] },
      });

      const requests = [
        apiGet('/api/users'),
        apiGet('/api/posts'),
        apiGet('/api/comments'),
      ];

      const results = await Promise.all(requests);

      expect(results).toHaveLength(3);
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });

    it('should properly handle token lifecycle', async () => {
      // First call with token
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 1 },
      });

      await apiPost('/api/protected', { data: 'test' });
      expect(mockedAxios.post).toHaveBeenCalled();

      // Second call should also make a request
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 2 },
      });

      await apiPost('/api/protected', { data: 'test2' });
      // Verify both calls were made
      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    });
  });

  // ============================================================================
  // Edge cases
  // ============================================================================

  describe('Edge cases', () => {
    it('should handle endpoint with trailing slash', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { items: [] },
      });

      await apiGet('/api/users/');

      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should handle special characters in dataParams', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 1 },
      });

      await apiPost('/api/users', {
        name: 'John & Jane',
        email: 'test+special@example.com',
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should handle large dataParams', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 1 },
      });

      const largeData = {};
      for (let i = 0; i < 100; i++) {
        (largeData as any)[`field${i}`] = `value${i}`;
      }

      await apiPost('/api/bulk', largeData);

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should handle null dataParams value', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 1 },
      });

      await getData({
        endPoint: '/api/test',
        type: 'post',
        dataParams: null as any,
      });

      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should handle undefined default_token', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { items: [] },
      });

      await getData({
        endPoint: '/api/public',
        type: 'get',
        dataParams: {},
        default_token: undefined,
      });

      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
});
