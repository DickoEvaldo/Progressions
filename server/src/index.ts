import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';

const PORT = 3000;

const SCRECT_KEY = "secret"


const app = express();
import { createUser, getUserByEmail } from './database/dbUser';
import { getCompletedCourses, getCompulsoryCoursesByPathway, getRecommendedCoursesByPathway, setCompletedCourse } from './database/dbCourse';
import { generateRoadmap } from './algorithmn/generate_roadmap';
import { getRoadMap, insertRoadMap } from './database/dbRoadmap';
import { randomUUID } from 'crypto';

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/register", async (req: Request, res: Response) => {
  let user = req.body;
  user.id = randomUUID()
  try {
    if (await getUserByEmail(user.email)) {
      res.status(400).send({
        error: "User already exists",
      });
      return;
    }
    await createUser(user, user.password);
    let roadmap = await generateRoadmap(user.program, user.interest);
    await insertRoadMap(roadmap, user.id);
    res.status(201).send({
      "token": jwt.sign({ id: user.id }, SCRECT_KEY)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Failed to create user",
    });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const user = await getUserByEmail(email);
    console.log(user);
    if (user.password !== req.body.password) {
      res.status(401).send({
        error: "Incorrect password",
      });
      return;
    }
    res.status(200).send({
      token: jwt.sign({ id: user.id }, SCRECT_KEY),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Failed to login",
    });
  }
});

app.get("/getRoadmap", async (req: Request, res: Response) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({
      error: "No token provided",
    });
    return;
  }

  let token = authHeader.split(" ")[1];
  try {
    let decoded: any = jwt.verify(token, SCRECT_KEY);
    res.status(200).send(await getRoadMap(decoded.id));
  } catch (err) {
    console.error(err);
    res.status(401).send({
      error: "Invalid token",
    });
  }
})

app.get("/getCompletedCourses", async (req: Request, res: Response) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({
      error: "No token provided",
    });
    return;
  }

  let token = authHeader.split(" ")[1];

  try {
    let decoded: any = jwt.verify(token, SCRECT_KEY);
    res.status(200).send(await getCompletedCourses(decoded.id));
  } catch (err) {
    console.error(err);
    res.status(401).send({
      error: "Invalid token",
    });
  }
})

app.post("/setCompletedCourses", async (req: Request, res: Response) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({
      error: "No token provided",
    });
    return;
  }

  let token = authHeader.split(" ")[1];

  let course_code = req.body.course_code;
  let value = req.body.value;

  try {
    let decoded: any = jwt.verify(token, SCRECT_KEY);
    await setCompletedCourse(course_code, decoded.id, value);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      error: "Invalid token",
    });
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});