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

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    lastName: string

    @Column({
        type: 'varchar',
        unique: true,
        length: 100,
        nullable: false,
    })
    email: string;


    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    password: string;

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses: Expense[];
}