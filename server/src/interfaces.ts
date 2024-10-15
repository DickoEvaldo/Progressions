import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  program: string;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  program: string;
  roadmap: Map<string, Term>;
  completedCourses: string[];
  interests: string[];
}

export interface Term {
  id: string;
  year: number;
  term: number;
  courses: Course[];
}

export interface Course extends RowDataPacket {
  courseId: string;
  code: string;
  name: string;
  year: number;
  term: number;
  details: string;
}

export interface Requisite extends RowDataPacket {
  courseId: string;
  preReq: string;
}

export interface CourseDetails {
  courseId: string;
  preReqs: string[];
  reqFor: string[]
  code: string;
  name: string;
  year: number;
  term: number;
  details: string;
}

export interface Degree {
  id: string;
  pathways: string[];
  name: string;
  details: string;
}

export interface Pathway {
  id: string;
  name: string;
  details: string;
  compulsory: string[];
  recommended: string[];
}