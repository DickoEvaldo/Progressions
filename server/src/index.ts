import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';

const PORT = 3000;

const SCRECT_KEY = "secret"


const app = express();
import { createUser, getUserByEmail } from './database/dbUser';
import { getCompulsoryCoursesByPathway, getRecommendedCoursesByPathway } from './database/dbCourse';
import { generateRoadmap } from './algorithmn/generate_roadmap';

app.use(express.json());

app.post("/register", async (req: Request, res: Response) => {
  let user = req.body;
  try {
    user = await createUser(user, user.password);
    res.status(201).send();
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

getCompulsoryCoursesByPathway("compa1").then((courses) => {
  console.log(courses);
})

generateRoadmap("compa1", "compa1").then((roadmap) => {
  console.log(roadmap);
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});