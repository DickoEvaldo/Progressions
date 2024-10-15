import { Degree, Pathway, Course, Requirement } from "../interfaces";
import { connection } from "./database";

export const getDegrees = async (): Promise<Degree[]> => {
  return new Promise((resolve, reject) => {
    connection.query<Degree[]>(
      "SELECT * FROM Degrees",
      [],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
}

export const getDegree = async (degree: string): Promise<Degree> => {
  return new Promise((resolve, reject) => {
    connection.query<Degree[]>(
      "SELECT * FROM Degrees WHERE id = ?",
      [degree],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}

export const getPathways = async (degree: string): Promise<Pathway[]> => {
  return new Promise((resolve, reject) => {
    connection.query<Pathway[]>(
      "SELECT * FROM Pathways WHERE degree = ?",
      [degree],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
}

export const getPathway = async (pathway: string): Promise<Pathway> => {
  return new Promise((resolve, reject) => {
    connection.query<Pathway[]>(
      "SELECT * FROM Pathways WHERE id = ?",
      [pathway],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}

export const getRequirements = async (pathway: string): Promise<string[]> => {
  const reqPacket: Requirement[] = await new Promise((resolve, reject) => {
    connection.query<Requirement[]>(
      "SELECT * FROM Compulsory WHERE pathway = ?",
      [pathway],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
  const requirements = reqPacket.map((req) => req.courseId)
  return requirements;
}

export const getRecommended = async (pathway: string): Promise<string[]> => {
  const reqPacket: Requirement[] = await new Promise((resolve, reject) => {
    connection.query<Requirement[]>(
      "SELECT * FROM Recommended WHERE pathway = ?",
      [pathway],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
  const requirements = reqPacket.map((req) => req.courseId)
  return requirements;
}

export const getMultipleRecommended = async (pathways: string[]): Promise<string[]> => {
  const pathwayQuery = "('" + pathways.join("', '") + "')";
  const reqPacket: Requirement[] = await new Promise((resolve, reject) => {
    connection.query<Requirement[]>(
      "SELECT *, COUNT(*) FROM Recommended WHERE pathway in ? GROUP BY courseId ORDER BY COUNT(*)",
      [pathwayQuery],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
  const requirements = reqPacket.map((req) => req.courseId)
  return requirements;
}
