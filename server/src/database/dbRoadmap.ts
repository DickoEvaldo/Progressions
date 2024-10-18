import { connection } from "./database";
import { randomUUID } from "crypto";

export function insertRoadMap(roadmap: any, userId: string) {

    let terms : {
        id: string,
        year: number,
        term: number,
        course: string 
    }[] = []

    for (let year = 0; year < 3; year++)
        for (let term = 0; term < 3; term++) {
            let course_amount = term === 2 ? 2 : 3
            for (let course_index = 0; course_index < course_amount; course_index++) {
                terms.push({
                    id: randomUUID(),
                    year: year + 1,
                    term: term + 1,
                    course: roadmap[year][term][course_index]
                })
            }
        }

    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO Terms (id, year, term, course) VALUES ?",
            [terms.map(term => [term.id, term.year, term.term, term.course])],
            (err, res : any) => {
                if (err) reject(err)
                    else connection.query(
                        "INSERT INTO Roadmaps (terms, userId) VALUES ?",
                        [terms.map(term => [term.id, userId])],
                        (err, res : any) => {
                            if (err) reject(err)
                            else resolve(res?.[0])
                        }
                    )
            }
        )



    })

}

export function getRoadMap(userId: string) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT year,term,courseId as course_code, name, details, difficulty from Roadmaps join Terms T on terms = T.id join Courses on T.course = Courses.courseId \
                    where userId=?;",
            [userId],
            (err, res : any) => {
                if (err) reject(err)
                else {
                    let roadmap : any[][][] = [
                        [[],[],[]],
                        [[],[],[]],
                        [[],[],[]]
                    ]
                    for (let record of res) {
                        roadmap[record.year - 1][record.term - 1].push({
                            course_code: record.course_code,
                            name: record.name,
                            details: record.details,
                            difficulty: record.difficulty
                        })
                    }
                    resolve(roadmap)
                }
            }
        )
    })
}