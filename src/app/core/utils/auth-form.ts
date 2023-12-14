import { Validators } from "@angular/forms";

export const registerControl = {
  username: '',
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
}
export const loginControl = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
}
export const sendOtpControl = {
  email: ['', [Validators.required, Validators.email]],
}
export const verifyOtpControl = {
  otp: ['', [Validators.required]],
}
export const resetPasswordControl = {
  otp: ['', [Validators.required]],
  password: ['', [Validators.required]],
  confirmPassword: ['', [Validators.required]],
}
