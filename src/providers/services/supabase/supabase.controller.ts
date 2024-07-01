import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { log } from "console";

@Controller('supabase')
export class SupabaseController{

  @Post("webhook")
  async webhook(@Body() data: any) {
    const { type, record, old_record } = data;
    try {
      switch (type) {
        case 'INSERT':
         console.log("INSERT");
         
        case 'UPDATE':
        console.log("UPDATE");
        case 'DELETE':
        console.log("DELETE");
        default:
          throw new HttpException(
            'Unsupported event type',
            HttpStatus.BAD_REQUEST,
          );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
