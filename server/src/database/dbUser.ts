
import { connection } from "./database";

type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  program: string,
  interest: string
}


export const getUser = async (userId: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "SELECT id, name, email, program FROM Users WHERE id = ?",
      [userId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}

  
export const createUser = async (user: User, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "INSERT INTO Users (name, email, password, program, interest) VALUES(?,?,?,?,?)",
      [user.name, user.email, password, user.program, user.interest],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}
  
export const updateUserDetails = async (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
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
    connection.query<any[]>(
      "UPDATE users SET password = ? WHERE id = ?",
      [password, userId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}

export const getUserByEmail = async (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "SELECT id, name, password, email, program, interest FROM Users WHERE email = ?",
      [email],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}