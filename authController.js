import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function hasRealGoogleClientId() {
  const id = process.env.GOOGLE_CLIENT_ID || "";
  return id.endsWith(".apps.googleusercontent.com") && !id.includes("your_google_client_id");
}

function makeToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function sendAuth(res, user) {
  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    provider: user.provider
  };
  res.json({ token: makeToken(user), user: safeUser });
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });

  if (existing) {
    return res.status(409).json({ message: "An account already exists with this email." });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash });
  sendAuth(res, user);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  sendAuth(res, user);
}

export async function googleLogin(req, res) {
  const { credential } = req.body;

  if (!hasRealGoogleClientId()) {
    return res.status(400).json({
      message: "Google Sign-In needs a real GOOGLE_CLIENT_ID in backend/.env and VITE_GOOGLE_CLIENT_ID in frontend/.env."
    });
  }

  if (!credential) {
    return res.status(400).json({ message: "Google credential is required." });
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();

  let user = await User.findOne({ email: payload.email.toLowerCase() });
  if (!user) {
    user = await User.create({
      name: payload.name,
      email: payload.email.toLowerCase(),
      avatar: payload.picture,
      provider: "google",
      googleId: payload.sub
    });
  } else {
    user.avatar = user.avatar || payload.picture;
    user.provider = user.provider || "google";
    user.googleId = user.googleId || payload.sub;
    await user.save();
  }

  sendAuth(res, user);
}

export async function me(req, res) {
  res.json({ user: req.user });
}
