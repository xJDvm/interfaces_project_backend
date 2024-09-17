import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { Users } from './entities/user.entity';

@EventSubscriber()
export class ProfileSubscriber implements EntitySubscriberInterface<Profile> {
  listenTo() {
    return Profile;
  }

  async afterInsert(event: InsertEvent<Profile>) {
    const profile = event.entity;
    if (profile.user) {
      const userRepository = event.manager.getRepository(Users);
      const user = await userRepository.findOneBy({ id: profile.user.id });
      if (user) {
        user.username = profile.user.username;
        await userRepository.save(user);
      }
    }
  }

  async afterUpdate(event: UpdateEvent<Profile>) {
    const profile = event.entity;
    if (profile && profile.user) {
      const userRepository = event.manager.getRepository(Users);
      const user = await userRepository.findOneBy({ id: profile.user.id });
      if (user) {
        user.username = profile.user.username;
        await userRepository.save(user);
      }
    }
  }
}
