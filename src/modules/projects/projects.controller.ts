import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TaskCategoriesService } from "@modules/task-categories/task-categories.service";
import { TasksService } from "@modules/tasks/tasks.service";
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AppController } from '@modules/app.controller';
import { Project, ProjectDocument } from './entities/project.entity';
import { Response } from "express";
import { log } from "console";

@Controller('projects')
export class ProjectsController extends AppController<ProjectDocument, CreateProjectDto, UpdateProjectDto>{

  constructor(
      private readonly projectsService: ProjectsService,
      private readonly taskCategoriesService: TaskCategoriesService,
      private readonly tasksService: TasksService,
  ) {
      super(projectsService, "projects");
  }

  @Get(":id/tasks-categories")
  async findTasksCategories(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.projectsService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTaskCategories = await this.taskCategoriesService.findWhere({projectId: id});
      if (!dataTaskCategories) {
        throw new Error("Not Found");
      }

      return this.responsesHelper.getResponse({
        res,
        path: "findTasksCategories",
        method: "Get",
        code: HttpStatus.OK,
        subject: "projects/tasks",
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
          subject: "projects/tasks",
          data: error.message,
        });
      } else {
        console.error("ProjectController > findTasksCategories : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "projects/tasks",
          data: error.message,
        });
      }
    }
  }

  @Get(":id/tasks")
  async findTasks(@Param('id') id: string, @Res() res: Response) {
    
    
    try {
      const data = await this.projectsService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTaskCategories = await this.taskCategoriesService.findWhere({projectId: id});
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
        subject: "projects/tasks",
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
          subject: "projects/tasks",
          data: error.message,
        });
      } else {
        console.error("ProjectController > findTasks : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "projects/tasks",
          data: error.message,
        });
      }
    }
  }
}
