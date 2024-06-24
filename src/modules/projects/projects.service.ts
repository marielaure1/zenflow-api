import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '@modules/projects/entities/project.entity';
import { CreateProjectDto } from '@modules/projects/dto/create-project.dto';
import { UpdateProjectDto } from '@modules/projects/dto/update-project.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class ProjectsService extends AppService<ProjectDocument, CreateProjectDto, UpdateProjectDto>{

  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {
    super(projectModel);
  }
}
