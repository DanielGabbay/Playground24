import { IUser } from '../data/dtos/user.type';

export type IUsersState = {
  users: IUser[];
  usersIndicators: { loading: boolean; loaded: boolean };
};

export const initialUsersState: IUsersState = {
  users: null,
  usersIndicators: {
    loading: false,
    loaded: false,
  },
};
