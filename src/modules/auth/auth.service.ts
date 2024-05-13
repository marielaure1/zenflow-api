import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
// import { TeamService } from '@modules/team/team.service';
// import { AuthUserTeamDto } from "@modules/auth/dto/auth-user-team.dto";
import { JwtService } from '@nestjs/jwt';
import Hash from '@helpers/hash.helpers';
import { Document, Types  } from 'mongoose';


@Injectable()
export class AuthService {

  private hash = new Hash();
  // private usersService: UsersService
  // private teamService: TeamService
  private jwtService = JwtService

  constructor(private readonly usersService: UsersService, private readonly teamService: TeamService) {
    this.usersService = usersService;
    this.teamService = teamService;
  }

  // async login(identifiant: string, pass: string): Promise<Object> {
  //   const user = await this.usersService.findOne(identifiant);

  //   const passCompare = await  this.hash.hashCompareData(pass, user?.password);

  //   if (!passCompare) {
  //     throw new UnauthorizedException();
  //   }

  //   const payload = { sub: user._id, username: user.email };

  //   const token = await this.jwtService.signAsync(payload);

  //   return {
  //     token
  //   };
  // }

  /**
   * 
   * @param data : Data send by the client
   * @param type : Is the user, client or team member ?
   * @returns 
   */
  async register(data: AuthUserTeamDto, type: string): Promise<Object> {

    try{

      const { email,  firstName, lastName, phones, emails, role, domains, jobs } = data
      const user = await this.usersService.findOneByEmail(data.email);

      if (user?.password !== data.password) {
        throw new UnauthorizedException();
      }

      const permissions = [
        {
          id: "56565652652nhuihyisjd",
          megaPermissionsId: {
            id: "5656658752nfdeedsjd",
            code: "ACCESS_TEAM_LIST",
            description: "Permet d'accédé à la liste des membres de l'équipe de la société.",
            title: "Liste équipe",
            statut: "Enabled"
          },
          statut: "Enabled"
        },
        {
          id: "565656532432nhuihyisjd",
          megaPermissionsId: {
            id: "5656658752nfQzdddsjd",
            code: "ACCESS_PROJECT_LIST",
            description: "Permet d'accédé à la liste des projets de la société.",
            title: "Liste projets",
            statut: "Enabled"
          },
          statut: "Disabled"
        }
      ]
      const passInit = "DESACTIVED_" + this.hash.generateToken("Password init");
      const statut =  "Desactived";
      const createdAt =  Date.now();
      const userCreated = await this.usersService.create({email, password: passInit, statut, createdAt});
      

      if(type == "client"){
        // const clientCreated = await this.usersService.create({email: data.email, password: passInit, statut: statut, createdAt: createdAt});
        
      } else {
        console.log("ede");
        
        const teamCreated = await this.teamService.create({ firstName, lastName, phones, emails, role, domains, jobs, permissions, user: (userCreated as any)._id});

        return {
          userCreated,
          teamCreated
        };
      }

      
    } catch (error){
      console.log("AuthModule > AuthService > register : ", error);  
    }
  }

  // async logout(identifiant: string, pass: string): Promise<Object> {
  //   const user = await this.usersService.findOne(identifiant);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }

  //   const payload = { sub: user._id, username: user.email };

  //   const token = await this.jwtService.signAsync(payload);

  //   return {
  //     token,
  //   };
  // }
}
