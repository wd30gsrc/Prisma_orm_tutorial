import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  res.json(user);
});

app.post("/createManyUsers", async (req: Request, res: Response) => {
  const { userList } = req.body;
  const users = await prisma.user.createMany({
    data: userList,
  });
  res.json(users);
});

app.post("/createManyCars", async (req: Request, res: Response) => {
  const { carList } = req.body;
  const cars = await prisma.car.createMany({
    data: carList,
  });
  res.json(cars);
});

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {cars: true}, // carsのkeyも返したいときはこの設定
  });
  res.json(users);
});

app.get("/byId/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    }
  })
  res.json(user);
})

app.put("/", async (req: Request, res: Response) => {
  const {id, username} = req.body;
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    }
  });

  res.json(updateUser);
});

app.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deleteUser);
});

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
