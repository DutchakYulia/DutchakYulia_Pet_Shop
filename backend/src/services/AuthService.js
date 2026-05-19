const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(data) {
    if (!data.name || !data.email || !data.password) throw new Error("Name, email and password are required");
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new Error("Email is already used");
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash
    });
    return { user, token: this.sign(user) };
  }

  async login(data) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error("Invalid email or password");
    const valid = await bcrypt.compare(data.password, user.password_hash);
    if (!valid) throw new Error("Invalid email or password");
    const publicUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    };
    return { user: publicUser, token: this.sign(publicUser) };
  }

  sign(user) {
    return jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET || "dev-secret", {
      expiresIn: "7d"
    });
  }
}

module.exports = AuthService;
