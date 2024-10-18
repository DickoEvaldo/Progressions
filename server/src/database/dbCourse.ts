import { connection } from "./database";

type Course = {
  code: string,
  name: string,
  description: string,
  terms: string[],
  preReqs: string[]
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
        preReqs: record.preReq ? [record.preReq] : []
      }
      courses.push(course)
    }
  }
  return courses
}

export function getCompulsoryCoursesByPathway(pathwayId: string): Promise<Course[]> {
  return new Promise((resolve, reject) => {
    connection.query<any[]>(
      "SELECT C.courseId as courseId, Term, details, preReq,name  from Compulsory \
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
      "SELECT C.courseId as courseId, Term, details, preReq,name  from Recommended \
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

