import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

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
