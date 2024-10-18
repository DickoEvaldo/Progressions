import { getCompulsoryCoursesByPathway, getRecommendedCoursesByPathway } from "../database/dbCourse";

function getCourseLevel(course_code : string){
    return parseInt(course_code.substring(4, 5))
}

export async function generateRoadmap(program_pathway: string, interest_pathway: string) {
    // let compulsoryCourses = await getCompulsoryCoursesByPathway(program_pathway);

    // // Sort courses by difficulty
    // compulsoryCourses.sort((a, b) => a.difficulty - b.difficulty)

    // let recommendedCourses = await getRecommendedCoursesByPathway(program_pathway);

    // // Sort courses by difficulty
    // recommendedCourses.sort((a, b) => a.difficulty - b.difficulty)

    // let takenCourses: any[] = [];

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

    roadmap[0][0][0] = "comp1511"
    roadmap[0][0][1] = "math1131"
    roadmap[0][0][2] = "math1081"

    roadmap[0][1][0] = "comp1531"
    roadmap[0][1][1] = "comp2521"
    roadmap[0][1][2] = "math1231"

    roadmap[0][2][0] = "comp1521"
    roadmap[0][2][1] = "comp6080"
    
    roadmap[1][0][0] = "comp2511"
    roadmap[1][0][1] = "comp2041"
    roadmap[1][0][2] = "comp3311"

    roadmap[1][1][0] = "comp3331"
    roadmap[1][1][1] = "comp3231"
    roadmap[1][1][2] = "desn1000"

    roadmap[1][2][0] = "comp3121"
    roadmap[1][2][1] = "comp6841"

    roadmap[2][0][0] = "comp6771"
    roadmap[2][0][1] = "comp6843"
    roadmap[2][0][2] = "arts1630"

    roadmap[2][1][0] = "comp3900"
    roadmap[2][1][1] = "cdev3000"
    roadmap[2][1][2] = "comp3511"

    roadmap[2][2][0] = "comp6991"
    roadmap[2][2][1] = "comp4920"


    // let changed = true
    // while (takenCourses.length < 24 && changed) {
    //     changed = false
    //     for (let year = 0; year < 3; year++)
    //         for (let term = 0; term < 3; term++) {
    //             let course_amount = term === 2 ? 2 : 3
    //             for (let course_index = 0; course_index < course_amount; course_index++) {
    //                 if (roadmap[year][term][course_index] === null) {
    //                     for (let course of compulsoryCourses) {
    //                         if (year === 0 && getCourseLevel(course.code) > 2) {
    //                             continue
    //                         }
    //                         if (takenCourses.includes(course.code)) {
    //                             continue
    //                         }
    //                         if (course.terms.includes(`${term + 1}`) && course.preReqs.every(preReq => takenCourses.includes(preReq))) {
    //                             roadmap[year][term][course_index] = course.code
    //                             takenCourses.push(course.code)
    //                             changed = true
    //                             break
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    // }

    // console.log(roadmap)


    // changed = true
    // while (takenCourses.length < 24 && changed) {
    //     changed = false
    //     for (let year = 0; year < 3; year++)
    //         for (let term = 0; term < 3; term++) {
    //             let course_amount = term === 2 ? 2 : 3
    //             for (let course_index = 0; course_index < course_amount; course_index++) {
    //                 if (roadmap[year][term][course_index] === null) {
    //                     for (let course of recommendedCourses) {
    //                         if (takenCourses.includes(course.code)) {
    //                             continue
    //                         }
    //                         if (course.terms.includes(`${term + 1}`) && course.preReqs.every(preReq => takenCourses.includes(preReq))) {
    //                             roadmap[year][term][course_index] = course.code
    //                             takenCourses.push(course.code)
    //                             changed = true
    //                             break
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    // }

    return roadmap
}