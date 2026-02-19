import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  propertyType: string;

  pricing: {
    amount: number;
    currency: "EUR" | "USD";
    period: "YEAR";
  };

  location: {
    addressText: string;
    distanceFromEUL: number;
  };

  description: string;
  features: string[];

  images: {
    primary: string;
    gallery: string[];
  };
}

const PropertySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    propertyType: {
      type: String,
      required: true,
      enum: [
        "Studio (1+0)",
        "1+1 Apartment",
        "2+1 Apartment",
        "3+1 Apartment",
        "House",
        "Single Room",
      ],
    },

    pricing: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["EUR", "USD"],
        required: true,
      },
      period: {
        type: String,
        enum: ["YEAR"],
        default: "YEAR",
      },
    },

    location: {
      addressText: {
        type: String,
        required: true,
      },
      distanceFromEUL: {
        type: Number,
        required: true,
      },
    },

    description: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },

    images: {
      primary: {
        type: String,
        required: true,
      },
      gallery: {
        type: [String],
        default: [],
        validate: [
          (arr: string[]) => arr.length <= 7,
          "Maximum 7 gallery images allowed",
        ],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);
