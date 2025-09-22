import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = Router();

function signToken(user: any) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'x', { expiresIn: '15m' });
}

router.get('/health', (req, res) => res.json({ ok: true }));

router.post('/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing' });
  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, password: hash, name } });
  res.json({ id: user.id, email: user.email });
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'invalid' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'invalid' });
  const token = signToken(user);
  res.json({ token, role: user.role });
});

// Admin endpoints
router.get('/admin/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/admin/setRole', async (req, res) => {
  const { userId, role } = req.body;
  const user = await prisma.user.update({ where: { id: userId }, data: { role } });
  res.json(user);
});

export default router;
