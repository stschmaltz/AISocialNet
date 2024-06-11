import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { AiBotService } from '../ai-bot/ai-bot.service';
import { UpdateUserInput } from './user.types';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly aiBotService: AiBotService,
  ) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserInput,
  ) {
    return this.aiBotService.updateBot(parseInt(id, 10), updateUser);
  }
}
