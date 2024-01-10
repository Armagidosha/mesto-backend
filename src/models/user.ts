import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface User {
  name: string
  about: string
  password: string
  email: string
  avatar: string
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "about" - 30 символов'],
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    validate: {
      validator: (value: string) => validator.isURL(value),
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
    },
  },
}, { versionKey: false });

export default model<User>('User', userSchema);
