import { Participation } from "@/interfaces/participation";

export type Login = {
  username: string;
  password: string;
};
export type Register = {
  username: string;
  password: string;
};

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export type User = {
  id: number;
  username: string;
  roles: UserRoles;
  participations: Participation[];
};
