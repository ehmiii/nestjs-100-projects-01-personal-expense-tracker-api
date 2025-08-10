import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Users } from './users.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Users> {
    listenTo() {
        return Users;
    }

    async beforeInsert(event: InsertEvent<Users>) {
        console.log(`BEFORE USER INSERTED: `, event.entity);
        // Convert password to hash
        event.entity.email = event.entity.email.toLowerCase();
        event.entity.password = await bcrypt.hash(event.entity.password, 12);

    }

    async beforeUpdate(event: UpdateEvent<Users>) {
        console.log(`BEFORE USER UPDATED: `, event.entity);
        const newPassword = event.entity?.password;
        const oldPassword = event.databaseEntity?.password;
        // Convert password to hash if it has been changed
        if (newPassword && newPassword !== oldPassword) {
            event.entity!.password = await bcrypt.hash(newPassword, 12);
        }
    }
}