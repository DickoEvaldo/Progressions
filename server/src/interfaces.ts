import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  degree: string;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  degree: string;
  interest: string;
  roadmap: Map<string, Term>;
  completedCourses: string[];
}

export interface Term {
  id: string;
  year: number;
  term: number;
  courses: Course[];
}

export interface Course extends RowDataPacket {
  courseId: string;
  name: string;
  details: string;
}

export interface PreReq extends RowDataPacket {
  courseId: string;
  preReq: string;
}

export interface CourseDetails {
  courseId: string;
  preReqs: string[];
  reqFor: string[]
  name: string;
  terms: string[];
  details: string;
}

export interface Degree extends RowDataPacket {
  id: string;
  name: string;
  details: string;
}

export interface Pathway extends RowDataPacket{
  id: string;
  degree: string;
  name: string;
  details: string;
}

export interface Requirement extends RowDataPacket {
  pathway: string;
  courseId: string;
}