import { getCompulsoryCoursesByPathway, getRecommendedCoursesByPathway } from "../database/dbCourse";

export async function generateRoadmap(program_pathway: string, interest_pathway: string) {
    let compulsoryCourses = await getCompulsoryCoursesByPathway(program_pathway);

    let takenCourses: any[] = [];

    let roadmap: any = [
        [
            [
                null, null, null
            ],
            [
                null, null, null
            ],
            [
                null, null
            ]
        ],
        [
            [
                null, null, null
            ],
            [
                null, null, null
            ],
            [
                null, null
            ]
        ],
        [
            [
                null, null, null
            ],
            [
                null, null, null
            ],
            [
                null, null
            ]
        ]
    ]

    let changed = true
    while (takenCourses.length < 24 && changed) {
        changed = false
        for (let year = 0; year < 3; year++)
            for (let term = 0; term < 3; term++) {
                let course_amount = term === 2 ? 2 : 3
                for (let course_index = 0; course_index < course_amount; course_index++) {
                    if (roadmap[year][term][course_index] === null) {
                        for (let course of compulsoryCourses) {
                            if (takenCourses.includes(course.code)) {
                                continue
                            }
                            if (course.terms.includes(`${term + 1}`) && course.preReqs.every(preReq => takenCourses.includes(preReq))) {
                                roadmap[year][term][course_index] = course.code
                                takenCourses.push(course.code)
                                changed = true
                                break
                            }
                        }
                    }
                }
            }
    }

    let recommendedCourses = await getRecommendedCoursesByPathway(program_pathway);

    changed = true
    while (takenCourses.length < 24 && changed) {
        changed = false
        for (let year = 0; year < 3; year++)
            for (let term = 0; term < 3; term++) {
                let course_amount = term === 2 ? 2 : 3
                for (let course_index = 0; course_index < course_amount; course_index++) {
                    if (roadmap[year][term][course_index] === null) {
                        for (let course of recommendedCourses) {
                            if (takenCourses.includes(course.code)) {
                                continue
                            }
                            if (course.terms.includes(`${term + 1}`) && course.preReqs.every(preReq => takenCourses.includes(preReq))) {
                                roadmap[year][term][course_index] = course.code
                                takenCourses.push(course.code)
                                changed = true
                                break
                            }
                        }
                    }
                }
            }
    }

    return roadmap
}