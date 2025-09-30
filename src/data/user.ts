export interface UserType {
  id: string;
  name: string;
  role: "yetkili";
  gender: "male" | "female";
  username: string;
  password: string;
  isLoggedIn?: boolean; // kontrol ekledik
}

export const users: UserType[] = [
  { id: "u1", name: "Ali Yılmaz", role: "yetkili", gender: "male", username:"yetkiliali",password: "ali12345", isLoggedIn: false },
  { id: "u2", name: "Ayşe Demir", role: "yetkili", gender: "female", username:"yetkiliayse",password: "ayse12345", isLoggedIn: false },
  { id: "u3", name: "Mehmet Kaya", role: "yetkili", gender: "male",username:"yetkilimehmet", password: "mehmet12345", isLoggedIn: false },
  { id: "u4", name: "Zeynep Şahin", role: "yetkili", gender: "female", username:"yetkilizeynep",password: "zeynep12345", isLoggedIn: false }
];