/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-25 13:51:40
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-26 10:56:41
 */

import { Document, Schema, model } from 'mongoose';

export interface IMobilePhoneDoc extends Document {
  _id: string;

  model_name: string;

  size: string;

  spec: string;

  ram: number;

  rom: number;

  seria_number: string;
}

console.log('实体类mobilePhone', new Date().getTime());
export const MobilePhoneSchema: Schema = new Schema(
  {
    model_name: { type: String },
    size: { type: String },
    spec: { type: String },
    ram: { type: Number },
    rom: { type: Number },
    seria_number: { type: String },
    deleted: { type: Boolean, default: false }
  },
  {
    // 静态模型
    strict: false,
    // __v 版本
    versionKey: false,
    timestamps: { createdAt: 'created', updatedAt: 'updated' }
  }
);

export const factory = () => model<IMobilePhoneDoc>('mobilePhone', MobilePhoneSchema, 'mobile-phone');
