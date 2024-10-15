import { User, UserDetails, Term } from "../interfaces";
import { connection } from "./database";
import { getCompletedCourses } from "./dbCourse";

export const getUser = async (userId: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<User[]>(
      "SELECT id, name, email, program FROM Users WHERE id = ?",
      [userId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}

export const getUserDetails = async (userId: string): Promise<UserDetails> => {
  const user: User = await getUser(userId);
  const getUserDetails: UserDetails = {
    id: user.id,
    name: user.name,
    email: user.email,
    program: user.program,
    roadmap: new Map<string, Term>(),
    completedCourses: await getCompletedCourses(userId) || [],
    interests: [],
  }
  return getUserDetails;
}
  
export const createUser = async (user: User, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<User[]>(
      "INSERT INTO users (id, name, email, password, program) VALUES(?,?,?,?,?,?)",
      [user.id, user.name, user.email, password, user.program],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}
  
export const updateUserDetails = async (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<User[]>(
      "UPDATE users SET name = ?, email = ?, program = ? WHERE id = ?",
      [user.name, user.email, user.program, user.id],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}
  
export const updateUserPassword = async (userId: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<User[]>(
      "UPDATE users SET password = ? WHERE id = ?",
      [password, userId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}