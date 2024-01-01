export interface UserAuth{
  username: {
    type: string,
    unique: true,
    // required: true,
    required: false,

  },
  email: {
    type: string,
    unique: true,
    required: true,
  },
  password: {
    type: string,
    minlength: 6,
    required: true,
  },
  role: {
    type: string,
    default: "Basic",
    required: true,
  },
  verified: {
    type: boolean,
    default: false,
  }

}


export interface loggedInUser {
  message: string,
  loggedInUser: existingUser
  access_token: string,
  verified: string
}

export interface existingUser {
  _id: string,
  email: string,
  role: string
}
