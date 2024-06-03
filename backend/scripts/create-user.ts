import { Human } from '../src/human/human.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';

async function createUsers() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const userService = appContext.get(UserService);

  // Create a human user
  const human = new Human();
  human.username = 'shaneschmaltz';
  human.email = 'stschmaltz@gmail.com';
  await userService.createHuman(human.username, human.email);

  console.log('Users created successfully');
}

createUsers().catch((error) => console.log(error));
