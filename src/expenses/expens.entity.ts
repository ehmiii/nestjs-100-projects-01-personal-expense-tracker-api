import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, } from 'typeorm';

import { Category } from './expens.enum';
import { User } from '../user/user.entity';

@Entity()
export class Expense {
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt?: Date;

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: string;

    @Column('enum', {
        enum: Category,
        default: Category.OTHER,
    })
    category: Category;

    @ManyToOne(() => User, (user) => user.expenses,)
    user: User;
}