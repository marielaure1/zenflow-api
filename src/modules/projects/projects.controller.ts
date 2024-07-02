import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TaskCategoriesService } from "@modules/task-categories/task-categories.service";
import { TasksService } from "@modules/tasks/tasks.service";
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AppController } from '@modules/app.controller';
import { Project, ProjectDocument } from './entities/project.entity';
import { Response, Request } from "express";
import { AuthGuard } from "@guards/auth.guard";
import { CustomFieldsService } from "@modules/custom-fields/custom-fields.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('projects')
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

  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Res() res: Response) {
    return super.create(createProjectDto, res);
  }

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects.' })
  @ApiResponse({ status: 404, description: 'Projects not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 200, description: 'Return a project.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a project by id' })
  @ApiResponse({ status: 200, description: 'The project has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Res() res: Response) {
    return super.update(id, updateProjectDto, res);
  }

  @ApiOperation({ summary: 'Delete a project by id' })
  @ApiResponse({ status: 200, description: 'The project has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }

  @ApiOperation({ summary: 'Get tasks categories for a project by id' })
  @ApiResponse({ status: 200, description: 'Return tasks categories for the project.' })
  @ApiResponse({ status: 404, description: 'Project or tasks categories not found.' })
  @Get(":id/tasks-categories")
  async findTasksCategories(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.projectsService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTaskCategories = await this.taskCategoriesService.findWhere({ where: { projectId: id } });
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

  @ApiOperation({ summary: 'Get tasks for a project by id' })
  @ApiResponse({ status: 200, description: 'Return tasks for the project.' })
  @ApiResponse({ status: 404, description: 'Project or tasks not found.' })
  @Get(":id/tasks")
  async findTasks(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.projectsService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTaskCategories = await this.taskCategoriesService.findWhere({ where: { projectId: id } });
      if (!dataTaskCategories) {
        throw new Error("Not Found");
      }

      const tasksPromises = dataTaskCategories.map(category => {
        return this.tasksService.findWhere({ where: { taskCategoryId: category._id.toString() } });
      });

      const dataTasks = await Promise.all(tasksPromises);

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

  @ApiOperation({ summary: 'Get all projects for the current owner' })
  @ApiResponse({ status: 200, description: 'Return all projects for the current owner.' })
  @ApiResponse({ status: 404, description: 'Projects not found.' })
  @UseGuards(AuthGuard)
  @Get("me")
  async findAllOwner(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];

    try {
      const data = await this.projectsService.findWhere({ where: { ownerId: customer._id.toString() } });

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwner",
        method: "Get",
        code: HttpStatus.OK,
        subject: "projects",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "projects",
          data: error.message,
        });
      } else {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "projects",
          data: error.message,
        });
      }
    }
  }
}
