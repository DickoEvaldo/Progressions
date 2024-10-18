import express, { Request, Response } from 'express';
import { CourseDetails } from './interfaces';
import { getCourseDetails } from './database/dbCourse';

const PORT = 3000;

const app = express();

app.get("/", async (req: Request, res: Response) => {
  res.json();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/test", async (req: Request, res: Response) => {
  const course: CourseDetails = await getCourseDetails("comp1511");
  res.json(course);
});