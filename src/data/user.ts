export interface UserType {
  id: string;
  name: string;
  role: "yetkili";
  gender: "male" | "female";
  username: string;
  password: string;
}

export const users: UserType[] = [
  { id: "u1", name: "Ali Yılmaz", role: "yetkili", gender: "male", username:"yetkiliali",password: "ali12345" },
  { id: "u2", name: "Ayşe Demir", role: "yetkili", gender: "female", username:"yetkiliayse",password: "ayse12345" },
  { id: "u3", name: "Mehmet Kaya", role: "yetkili", gender: "male",username:"yetkilimehmet", password: "mehmet12345" },
  { id: "u4", name: "Zeynep Şahin", role: "yetkili", gender: "female", username:"yetkilizeynep",password: "zeynep12345" }
];