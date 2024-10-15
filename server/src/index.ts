import express, { Request, Response } from 'express';

const PORT = 3000;

const app = express();

app.get("/", async (req: Request, res: Response) => {
    res.json();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });