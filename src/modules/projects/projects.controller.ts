import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AppController } from '@modules/app.controller';
import { Project } from './entities/project.entity';
@Controller('projects')
export class ProjectsController extends AppController<ProjectsService, Project, CreateProjectDto, UpdateProjectDto>{

  constructor(
      private readonly projectsService: ProjectsService,
  ) {
      super(projectsService, "projects");
      this.responsesHelper = new ResponsesHelper();
  }
}
