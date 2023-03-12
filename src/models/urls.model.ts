import { model, Schema, Model, Document } from 'mongoose';

export interface IUrlModel extends Document {
  name: string,
  description: string
}
const UrlsSchema: Schema = new Schema({
  originalUrl: { type: String, required: true, unique : true },
  shortUrl: { type: String, required: true},
  code: { type: String, required: true, unique : true},
}, { timestamps: true });

export const Urls: Model<IUrlModel> = model<IUrlModel>('Urls', UrlsSchema);