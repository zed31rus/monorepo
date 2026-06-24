export interface PersonalUser {
  allowEmailFind: boolean
  allowLoginFind: boolean
  avatar: string | null
  createdAt: string
  email: string
  emailConfirmed: boolean
  isAdmin: boolean
  login: string
  nickname: string
  uuid: string
}

export interface PublicUser {
  uuid: string
  nickname: string
  avatar: string | null 
  createdAt: string
}