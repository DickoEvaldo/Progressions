import { RowDataPacket } from "mysql2";
import { Course, CourseDetails, PreReq } from "../interfaces";
import { connection } from "./database";

export const getAllCourses = async (): Promise<Course[]> => {
  return new Promise((resolve, reject) => {
    connection.query<Course[]>(
      "SELECT * FROM Courses",
      [],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
}

export const getCourse = async (courseId: string): Promise<Course> => {
  return new Promise((resolve, reject) => {
    connection.query<Course[]>(
      "SELECT * FROM Courses WHERE courseId = ?",
      [courseId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      }
    )
  })
}
interface TermAvailable extends RowDataPacket {
  term: string
}
export const getCourseDetails = async (courseId: string): Promise<CourseDetails> => {
  const course: Course = await getCourse(courseId);
  const terms: TermAvailable[] = await new Promise((resolve, reject) => {
    connection.query<TermAvailable[]>(
      "SELECT term FROM CourseTerms WHERE courseId = ?",
      [courseId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
  const strterms = terms.map((term) => term.term);
  const courseDets: CourseDetails = {
    courseId: course.courseId,
    name: course.name,
    terms: strterms,
    details: course.details,
    preReqs: await getPreReqs(courseId),
    reqFor: await getReqs(courseId),
  }
  return courseDets
}

export const getPreReqs = async (courseId: string): Promise<string[]> => {
  const preReqPacket: PreReq[] = await new Promise((resolve, reject) => {
    connection.query<PreReq[]>(
      "SELECT * FROM PreReqs WHERE courseId = ?",
      [courseId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
  const preReqs: string[] = preReqPacket.map((preReq) => preReq.preReq);
  return preReqs;
}

export const getReqs = async (courseId: string): Promise<string[]> => {
  const preReqPacket: PreReq[] = await new Promise((resolve, reject) => {
    connection.query<PreReq[]>(
      "SELECT * FROM PreReqs WHERE preReq = ?",
      [courseId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
  const courses: string[] = preReqPacket.map((preReq) => preReq.courseId);
  return courses;
}

export const getCompletedCourses = async (userId: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "SELECT course FROM CompletedCourses WHERE id = ?",
      [userId],
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
}