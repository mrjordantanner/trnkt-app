
export interface UpdateUserRequestBody {
    email: string;
    newEmail?: string | undefined;
    newUserName?: string | undefined;
    newPassword?: string | undefined;
  }