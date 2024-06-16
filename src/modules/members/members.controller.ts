import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MembersService } from './members.service';
import { TaskCategoriesService } from "@modules/task-categories/task-categories.service";
import { TasksService } from "@modules/tasks/tasks.service";
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AppController } from '@modules/app.controller';
import { Member, MemberDocument } from './entities/member.entity';
import { Response } from "express";
import { log } from "console";

@Controller('members')
export class MembersController extends AppController<MemberDocument, CreateMemberDto, UpdateMemberDto>{

  constructor(
      private readonly membersService: MembersService,
      private readonly taskCategoriesService: TaskCategoriesService,
      private readonly tasksService: TasksService,
  ) {
      super(membersService, "members");
  }

  @Get(":id/tasks-categories")
  async findTasksCategories(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.membersService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTaskCategories = await this.taskCategoriesService.findWhere({memberId: id});
      if (!dataTaskCategories) {
        throw new Error("Not Found");
      }

      return this.responsesHelper.getResponse({
        res,
        path: "findTasksCategories",
        method: "Get",
        code: HttpStatus.OK,
        subject: "members/tasks",
        data: {
          data: data,
          taskCategories: dataTaskCategories
        },
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findTasksCategories",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "members/tasks",
          data: error.message,
        });
      } else {
        console.error("MemberController > findTasksCategories : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "members/tasks",
          data: error.message,
        });
      }
    }
  }

  @Get(":id/tasks")
  async findTasks(@Param('id') id: string, @Res() res: Response) {
    
    
    try {
      const data = await this.membersService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTaskCategories = await this.taskCategoriesService.findWhere({memberId: id});
      if (!dataTaskCategories) {
        throw new Error("Not Found");
      }

      const tasksPromises = dataTaskCategories.map( category => {
        return this.tasksService.findWhere({ taskCategoryId: category._id.toString() });
      });
    
      const dataTasks = await Promise.all(tasksPromises);
    
      // Log les tâches récupérées pour chaque catégorie
      dataTasks.forEach((tasks, index) => {
        console.log(`Tasks for category ${dataTaskCategories[index]._id}:`, tasks);
      });
    
      // Vérifiez si au moins une tâche a été trouvée
      // if (dataTasks.length === 0 || dataTasks.every(tasks => tasks.length === 0)) {
      //   throw new Error("Not Found");
      // }
    
      // Flatten the array of arrays into a single array of tasks
      const allTasks = dataTasks.flat();
    
      // Log les tâches finales après aplatissement
      console.log('All Tasks:', allTasks);

      return this.responsesHelper.getResponse({
        res,
        path: "findTasks",
        method: "Get",
        code: HttpStatus.OK,
        subject: "members/tasks",
        data: {
          data: data,
          taskCategories: dataTaskCategories,
          tasks: allTasks
        },
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findTasks",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "members/tasks",
          data: error.message,
        });
      } else {
        console.error("MemberController > findTasks : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "members/tasks",
          data: error.message,
        });
      }
    }
  }
}
