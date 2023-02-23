import { UserDto } from './dtos/UserDto'
import { client } from '../utils/axios'

export function signUp(userInfo: UserDto) {
  return client.post('/auth/signup', userInfo)
}

export function signIn(userInfo: UserDto) {
  return client.post('/auth/signin', userInfo)
}
