import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  role: "user" | "owner" | "admin";

  contact: {
    phone?: string;
  };

  avatar?: string;

  preferences: {
    apartmentType?: string;
    location?: string;
    budget?: string;
  };

  favorites: mongoose.Types.ObjectId[];

  isVerified: boolean;

  resetToken?: string;
  resetTokenExpiry?: Date;
}

const UserSchema: Schema = new Schema(
  {
    /* ================= BASIC INFO ================= */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    /* ================= ROLE ================= */
    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },

    /* ================= CONTACT ================= */
    contact: {
      phone: {
        type: String,
        default: "",
      },
    },

    /* ================= PROFILE ================= */
    avatar: {
      type: String,
      default: "",
    },

    /* ================= CHATBOT / USER PREFS ================= */
    preferences: {
      apartmentType: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      budget: {
        type: String,
        default: "",
      },
    },

    /* ================= FAVORITES ================= */
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    /* ================= SECURITY ================= */
    isVerified: {
      type: Boolean,
      default: false,
    },

    resetToken: {
      type: String,
    },

    resetTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);