const zod = require("zod");

const createUser = zod.object({
  firstname: zod.string().nonempty({ message: "First name is required" }),
  lastname: zod.string().nonempty({ message: "Last name is required" }),
  email: zod.string().email({ message: "Please enter a valid email address" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &)",
    }),
});

const SignInUser = zod.object({
  id: zod.string().email(),
});
const updateUser = zod.object({
  email: zod.string().email({ message: "Please enter a valid email address" }),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
});

module.exports = {
  createUser,
  SignInUser,
  updateUser,
};
