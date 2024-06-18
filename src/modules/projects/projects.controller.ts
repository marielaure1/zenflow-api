import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TaskCategoriesService } from "@modules/task-categories/task-categories.service";
import { TasksService } from "@modules/tasks/tasks.service";
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AppController } from '@modules/app.controller';
import { Project, ProjectDocument } from './entities/project.entity';
import { Response, Request } from "express";
import { log } from "console";
import { AuthGuard } from "@guards/auth.guard";
import { CustomFieldsService } from "@modules/custom-fields/custom-fields.service";

@Controller('projects')
export class ProjectsController extends AppController<ProjectDocument, CreateProjectDto, UpdateProjectDto>{

  constructor(
      private readonly projectsService: ProjectsService,
      private readonly taskCategoriesService: TaskCategoriesService,
      private readonly tasksService: TasksService,
      private readonly customsFieldsService: CustomFieldsService,
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

      const allTasks = dataTasks.flat();
    
  
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

  @Get("me")
  @UseGuards(AuthGuard)
  async findAllOwner(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];
 
    try {
      const data = await this.projectsService.findWhere({ownerId: customer._id.toString() });
      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwner",
        method: "Get",
        code: HttpStatus.OK,
        subject: "clients",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "clients",
          data: error.message,
        });
      } else {
        console.error("AppController > findAll : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "clients",
          data: error.message,
        });
      }
    }
  }

  @Get("me/custom-fields")
  @UseGuards(AuthGuard)
  async findAllOwnerCustomsFields(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];

    try {
      const data = await this.customsFieldsService.findWhere({
        ownerId: customer._id.toString(),
        schema: 'Clients',
      });

      // console.log(data);
      

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwnerCustomsFields",
        method: "Get",
        code: HttpStatus.OK,
        subject: "clients",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "clients",
          data: error.message,
        });
      } else {
        console.error("ClientsController > findAllOwnerCustomsFields : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "clients",
          data: error.message,
        });
      }
    }
  }

  @Get(":id/me/custom-fields")
  @UseGuards(AuthGuard)
  async findOneOwnerCustomsFields(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    const customer = req['customer'];

    try {
      const data = await this.customsFieldsService.findWhere({
        ownerId: customer._id.toString(),
        schema: 'Clients',
        $or: [
          {schemaIds: null}
        ]  
      });

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwnerCustomsFields",
        method: "Get",
        code: HttpStatus.OK,
        subject: "clients",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "clients",
          data: error.message,
        });
      } else {
        console.error("ClientsController > findAllOwnerCustomsFields : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "clients",
          data: error.message,
        });
      }
    }
  }



}
