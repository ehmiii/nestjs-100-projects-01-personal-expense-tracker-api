import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Expense } from '../expenses/expens.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column()
    firstName: string;

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true }) // Exclude password from serialization
    password: string;

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses: Expense[];
}