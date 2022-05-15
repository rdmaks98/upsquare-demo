import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn } from 'typeorm';
import { Max, Min, IsEmail, IsNotEmpty, Length } from "class-validator";
import { userModelInterface } from '../Interfaces';
import { JWT_EXPIRE, JWT_SECRET } from "../../Config";
export const UNIQUE_USER_EMAIL_CONSTRAINT = 'unique_user_email_constraint';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import log from '../Logger';

@Entity()
@Unique(['email'])

export default class User {
	[x: string]: any;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	@Length(4, 40, { message: 'The name must be at least 4 but not longer than 40 characters' })
	@IsNotEmpty({ message: 'The name is required' })
	name: string;

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'The email is required' })
	email: string;

	@Column({ nullable: false, select: false })
	@Min(4, { message: "password length cannot be lesser 4" })
	@Max(8, { message: "password length cannot be greater 8" })
	password: string;

	@Column({ default: "user" })
	role: string;

	@Column({ default: Date.now() })
	@CreateDateColumn()
	createdAt: Date;

	@Column({ nullable: true })
	resetPasswordToken: string;

	@Column({ nullable: true })
	resetPasswordExpires: Date;

	setPassword = (password: string) => {
		return (this.password = bcrypt.hashSync(password, 7))
	}

	isValidPassword = (password: string) => {
        return bcrypt.compareSync(password,this.password)
    }

	getJWTToken = () => {
		let user = this as unknown as userModelInterface;
		return jwt.sign({ email: user.email }, JWT_SECRET as string, {
			expiresIn: JWT_EXPIRE,
  		});
	}
}