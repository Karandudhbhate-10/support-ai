import mongoose, { model, Schema } from "mongoose";

interface ISettings {
  ownerID: string;
  businessName: string;
  supportEmail: string;
  knowledge: string;
}

const settingsSchema = new Schema<ISettings>(
  {
    ownerID: {
      type: String,
      required: true,
      nique: true,
    },
    businessName: {
      type: String,
    },
    supportEmail: {
      type: String,
    },
    knowledge: {
      type: String,
    },
  },
  { timestamps: true }
);

const Settings = mongoose.models.Settings || model("Settings", settingsSchema);

export default Settings;
