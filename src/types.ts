export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic?: string; // Optional property
  isBuyer: boolean;
}