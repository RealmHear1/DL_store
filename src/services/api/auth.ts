import axios from 'axios'

interface RegisterData {
  email: string
  phoneNumber: string
  password: string
}

interface AuthResponse {
  accessToken: string
  user: {
    id: string
    email: string
    createdAt: string
  }
}

interface LoginData {
  email: string
  password: string
}

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>('http://localhost:4001/register', data)
    console.log('Регистрация прошла успешно', response.data)
    return response.data
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка регистрации', error.response?.data || error.message)
    } else {
      console.error('Неизвестная ошибка', error)
    }
    throw error
  }
}
// () => registerUser({
//   email: 'ratat@mail.ru',
//   password: '1234',
//   phoneNumber: '+79998887766'
// })

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post('http://localhost:4001/login', data)
    console.log('Пользователь успешно вошёл', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка логина:', error.response?.data || error.message);
    } else {
      console.error('Неожиданная ошибка:', error);
    }
    throw error;
  }
}
// () => loginUser({
//   email: 'ratat@mail.ru',
//   password: '1234'
// })