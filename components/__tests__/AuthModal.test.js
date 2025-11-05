import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthModal from '../AuthModal'
import { authApi } from '@/lib/api'
import { toast } from 'sonner'

// Mock the API module
jest.mock('@/lib/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
  },
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('AuthModal', () => {
  const mockOnClose = jest.fn()
  const mockOnSuccess = jest.fn()
  let localStorageSetItemSpy
  let localStorageGetItemSpy

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem')
  })

  afterEach(() => {
    localStorageSetItemSpy.mockRestore()
    localStorageGetItemSpy.mockRestore()
  })

  it('renders the modal when open is true', () => {
    render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

    expect(screen.getByText('Tucker Trips')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /sign up/i })).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    render(<AuthModal open={false} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

    expect(screen.queryByText('Tucker Trips')).not.toBeInTheDocument()
  })

  describe('Login Tab', () => {
    it('displays login form by default', () => {
      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('updates email input on change', async () => {
      const user = userEvent.setup()
      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      await user.type(emailInput, 'test@example.com')

      expect(emailInput).toHaveValue('test@example.com')
    })

    it('updates password input on change', async () => {
      const user = userEvent.setup()
      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const passwordInput = screen.getByPlaceholderText('••••••••')
      await user.type(passwordInput, 'password123')

      expect(passwordInput).toHaveValue('password123')
    })

    it('calls login API and handles success', async () => {
      const user = userEvent.setup()
      const mockResponse = {
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
      }

      authApi.login.mockResolvedValueOnce(mockResponse)

      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      const passwordInput = screen.getByPlaceholderText('••••••••')
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(loginButton)

      await waitFor(() => {
        expect(authApi.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          name: '',
        })
      })

      expect(localStorageSetItemSpy).toHaveBeenCalledWith('token', 'test-token')
      expect(toast.success).toHaveBeenCalledWith('Welcome back!')
      expect(mockOnSuccess).toHaveBeenCalledWith(mockResponse.user)
    })

    it('handles login error', async () => {
      const user = userEvent.setup()
      const errorMessage = 'Invalid credentials'

      authApi.login.mockRejectedValueOnce(new Error(errorMessage))

      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      const passwordInput = screen.getByPlaceholderText('••••••••')
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(loginButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(errorMessage)
      })

      expect(localStorageSetItemSpy).not.toHaveBeenCalled()
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })

    it('shows default error message when error has no message', async () => {
      const user = userEvent.setup()
      authApi.login.mockRejectedValueOnce({})

      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      const passwordInput = screen.getByPlaceholderText('••••••••')
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(loginButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Authentication failed')
      })
    })
  })

  describe('Register Tab', () => {
    it('switches to register tab when Sign Up is clicked', async () => {
      const user = userEvent.setup()
      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const signUpTab = screen.getByRole('tab', { name: /sign up/i })
      await user.click(signUpTab)

      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    it('displays all register form fields', async () => {
      const user = userEvent.setup()
      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const signUpTab = screen.getByRole('tab', { name: /sign up/i })
      await user.click(signUpTab)

      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    })

    it('calls register API and handles success', async () => {
      const user = userEvent.setup()
      const mockResponse = {
        token: 'test-token',
        user: { id: '1', email: 'newuser@example.com', name: 'New User' },
      }

      authApi.register.mockResolvedValueOnce(mockResponse)

      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const signUpTab = screen.getByRole('tab', { name: /sign up/i })
      await user.click(signUpTab)

      const nameInput = screen.getByPlaceholderText('John Doe')
      const emailInput = screen.getByPlaceholderText('you@example.com')
      const passwordInput = screen.getByPlaceholderText('••••••••')
      const signUpButton = screen.getByRole('button', { name: /sign up/i })

      await user.type(nameInput, 'New User')
      await user.type(emailInput, 'newuser@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(signUpButton)

      await waitFor(() => {
        expect(authApi.register).toHaveBeenCalledWith({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123',
        })
      })

      expect(localStorageSetItemSpy).toHaveBeenCalledWith('token', 'test-token')
      expect(toast.success).toHaveBeenCalledWith('Account created successfully!')
      expect(mockOnSuccess).toHaveBeenCalledWith(mockResponse.user)
    })

    it('handles register error', async () => {
      const user = userEvent.setup()
      const errorMessage = 'Email already exists'

      authApi.register.mockRejectedValueOnce(new Error(errorMessage))

      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const signUpTab = screen.getByRole('tab', { name: /sign up/i })
      await user.click(signUpTab)

      const nameInput = screen.getByPlaceholderText('John Doe')
      const emailInput = screen.getByPlaceholderText('you@example.com')
      const passwordInput = screen.getByPlaceholderText('••••••••')
      const signUpButton = screen.getByRole('button', { name: /sign up/i })

      await user.type(nameInput, 'New User')
      await user.type(emailInput, 'existing@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(signUpButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(errorMessage)
      })

      expect(localStorageSetItemSpy).not.toHaveBeenCalled()
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })
  })

  describe('Form State', () => {
    it('clears form after successful login', async () => {
      const user = userEvent.setup()
      const mockResponse = {
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
      }

      authApi.login.mockResolvedValueOnce(mockResponse)

      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      const passwordInput = screen.getByPlaceholderText('••••••••')
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(loginButton)

      await waitFor(() => {
        expect(emailInput).toHaveValue('')
        expect(passwordInput).toHaveValue('')
      })
    })

    it('preserves form state when switching between tabs', async () => {
      const user = userEvent.setup()
      render(<AuthModal open={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)

      // Type in login form
      const emailInput = screen.getByPlaceholderText('you@example.com')
      await user.type(emailInput, 'test@example.com')

      // Switch to register
      const signUpTab = screen.getByRole('tab', { name: /sign up/i })
      await user.click(signUpTab)

      // Switch back to login
      const loginTab = screen.getByRole('tab', { name: /login/i })
      await user.click(loginTab)

      // Email should be preserved
      const emailInputAfterSwitch = screen.getByPlaceholderText('you@example.com')
      expect(emailInputAfterSwitch).toHaveValue('test@example.com')
    })
  })
})
