export interface SignupRequest {
  email: string;
  password: string;
  grade: number;
  departmentId: number;
  studentId: number;
}

export interface SignupResponseData {
  userId: number;
  email: string;
  grade: number;
  departmentId: number;
  studentId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  userId: number;
  email: string;
  accessToken: string;
  refreshToken: string;
}
