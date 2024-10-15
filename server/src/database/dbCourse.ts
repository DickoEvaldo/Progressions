import { Course, CourseDetails, Requisite } from "../interfaces";
import { connection } from "./database";

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

export const getCourseDetails = async (courseId: string): Promise<CourseDetails> => {
  const course: Course = await getCourse(courseId);
  const courseDets: CourseDetails = {
    courseId: course.courseId,
    code: course.code,
    name: course.name,
    year: course.year,
    term: course.term,
    details: course.details,
    preReqs: await getPreReqs(courseId),
    reqFor: await getReqs(courseId),
  }
  return courseDets
}

export const getPreReqs = async (courseId: string): Promise<string[]> => {
  const preReqPacket: Requisite[] = await new Promise((resolve, reject) => {
    connection.query<Requisite[]>(
      "SELECT * FROM Requisites WHERE courseId = ?",
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
  const preReqPacket: Requisite[] = await new Promise((resolve, reject) => {
    connection.query<Requisite[]>(
      "SELECT * FROM Requisites WHERE preReq = ?",
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