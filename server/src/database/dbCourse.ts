import { connection } from "./database";

type Course = {
  code: string,
  name: string,
  description: string,
  terms: string[],
  preReqs: string[],
  difficulty: number
}

function formatCourse(records: any[]) {
  let courses: Course[] = []
  for (let record of records) {
    if (courses.find(course => course.code === record.courseId)) {
      let course = courses.find(course => course.code === record.courseId)!
      course.terms.push(record.Term)
      if (record.preReq) {
        course.preReqs.push(record.preReq)
      }
      course.terms = Array.from(new Set(course.terms))
      course.preReqs = Array.from(new Set(course.preReqs))
    } else {
      let course: Course = {
        code: record.courseId,
        name: record.name,
        description: record.details,
        terms: [record.Term],
        preReqs: record.preReq ? [record.preReq] : [],
        difficulty: record.difficulty
      }
      courses.push(course)
    }
  }
  return courses
}

export function getCompulsoryCoursesByPathway(pathwayId: string): Promise<Course[]> {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "SELECT C.courseId as courseId, Term, details, preReq,name, difficulty from Compulsory \
        join Courses C on Compulsory.courseId = C.courseId \
        join CourseTerms on C.courseId = CourseTerms.courseId \
        left join PreReqs on C.courseId = PreReqs.courseId \
        where Compulsory.pathway = ?;",
      [pathwayId],
      (err, res) => {
        if (err) reject(err)
        else {
          resolve(formatCourse(res))
        }
      }
    )
  })
}


export function getRecommendedCoursesByPathway(pathwayId: string): Promise<Course[]> {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "SELECT C.courseId as courseId, Term, details, preReq,name, difficulty  from Recommended \
        join Courses C on Recommended.courseId = C.courseId \
        join CourseTerms on C.courseId = CourseTerms.courseId \
        left join PreReqs on C.courseId = PreReqs.courseId \
        where Recommended.pathway = ?;",
      [pathwayId],
      (err, res) => {
        if (err) reject(err)
        else {
          resolve(formatCourse(res))
        }
      }
    )
  })
}

export function setCompletedCourse(courseId: string, userId: string, value: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    if (value) {
      connection.query(
        "INSERT INTO CompletedCourses (course, userId) VALUES(?,?)",
        [courseId, userId],
        (err, res : any) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    }else{
      connection.query(
        "DELETE FROM CompletedCourses WHERE course = ? AND userId = ?",
        [courseId, userId],
        (err, res : any) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    }
  })
}

export function getCompletedCourses(userId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "SELECT course from CompletedCourses where userId = ?;",
      [userId],
      (err, res) => {
        if (err) reject(err)
        else {
          resolve(res.map(record => record.course))
        }
      }
    )
  })
}