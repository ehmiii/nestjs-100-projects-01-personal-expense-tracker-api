import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {
        console.log(`BEFORE USER INSERTED: `, event.entity);
        // Convert password to hash
        event.entity.password = await bcrypt.hash(event.entity.password, 12);

    }

    async beforeUpdate(event: UpdateEvent<User>) {
        console.log(`BEFORE USER UPDATED: `, event.entity);
        const newPassword = event.entity?.password;
        const oldPassword = event.databaseEntity?.password;
        // Convert password to hash if it has been changed
        if (newPassword && newPassword !== oldPassword) {
            event.entity!.password = await bcrypt.hash(newPassword, 12);
        }
    }
}