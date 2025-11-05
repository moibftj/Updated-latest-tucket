import { apiClient, ApiError, authApi } from '../api'

// Mock fetch globally
global.fetch = jest.fn()

describe('ApiError', () => {
  it('creates an error with message, status, and data', () => {
    const error = new ApiError('Test error', 400, { foo: 'bar' })

    expect(error.message).toBe('Test error')
    expect(error.status).toBe(400)
    expect(error.data).toEqual({ foo: 'bar' })
    expect(error.name).toBe('ApiError')
  })

  it('is an instance of Error', () => {
    const error = new ApiError('Test error', 400, null)

    expect(error instanceof Error).toBe(true)
    expect(error instanceof ApiError).toBe(true)
  })
})

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('makes a GET request to the correct endpoint', async () => {
    const mockResponse = { data: 'test' }
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await apiClient('/test')

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    )
    expect(result).toEqual(mockResponse)
  })

  it('prepends /api to endpoint if not present', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test')

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.any(Object)
    )
  })

  it('does not prepend /api if already present', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/api/test')

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.any(Object)
    )
  })

  it('includes Authorization header when token is present', async () => {
    localStorage.setItem('token', 'test-token')

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test')

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-token',
        }),
      })
    )
  })

  it('does not include Authorization header when skipAuth is true', async () => {
    localStorage.setItem('token', 'test-token')

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test', { skipAuth: true })

    const callArgs = global.fetch.mock.calls[0][1]
    expect(callArgs.headers.Authorization).toBeUndefined()
  })

  it('makes a POST request with body', async () => {
    const requestBody = { name: 'Test', email: 'test@example.com' }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test', {
      method: 'POST',
      body: requestBody,
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
    )
  })

  it('does not include body in GET request', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test', {
      method: 'GET',
      body: { foo: 'bar' },
    })

    const callArgs = global.fetch.mock.calls[0][1]
    expect(callArgs.body).toBeUndefined()
  })

  it('throws ApiError when response is not ok', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Bad request' }),
    })

    try {
      await apiClient('/test')
      fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect(error.message).toBe('Bad request')
      expect(error.status).toBe(400)
    }
  })

  it('uses error message from response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not found' }),
    })

    try {
      await apiClient('/test')
    } catch (error) {
      expect(error.message).toBe('Not found')
      expect(error.status).toBe(404)
    }
  })

  it('uses default error message when none provided', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    })

    try {
      await apiClient('/test')
    } catch (error) {
      expect(error.message).toBe('An error occurred')
    }
  })

  it('handles network errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network failure'))

    try {
      await apiClient('/test')
      fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect(error.message).toBe('Network failure')
    }
  })

  it('handles JSON parsing errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON')
      },
    })

    try {
      await apiClient('/test')
      fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect(error.message).toBe('Invalid JSON')
    }
  })

  it('merges custom headers with default headers', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test', {
      headers: {
        'X-Custom-Header': 'custom-value',
      },
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'X-Custom-Header': 'custom-value',
        }),
      })
    )
  })

  it('supports PATCH method', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test', {
      method: 'PATCH',
      body: { name: 'Updated' },
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ name: 'Updated' }),
      })
    )
  })

  it('supports DELETE method', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    await apiClient('/test/123', {
      method: 'DELETE',
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test/123',
      expect.objectContaining({
        method: 'DELETE',
      })
    )
  })
})

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  describe('login', () => {
    it('calls the correct endpoint with credentials', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' }
      const mockResponse = { token: 'jwt-token', user: { id: '1' } }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await authApi.login(credentials)

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(credentials),
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('register', () => {
    it('calls the correct endpoint with user data', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
      const mockResponse = { token: 'jwt-token', user: { id: '1' } }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await authApi.register(userData)

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/register',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(userData),
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getMe', () => {
    it('calls the correct endpoint and includes auth token', async () => {
      localStorage.setItem('token', 'test-token')
      const mockResponse = { user: { id: '1', email: 'test@example.com' } }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await authApi.getMe()

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/me',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })
})
