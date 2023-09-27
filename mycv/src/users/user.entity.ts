import { Report } from '../reports/report.entity';
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('inserted user ' + this.id);
    }

    @AfterUpdate()
    logUpdated() {
        console.log('updated user ' + this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed user ' + this.id);
    }
}
