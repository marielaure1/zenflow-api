import { Module } from '@nestjs/common';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { SupabaseController } from '@providers/services/supabase/supabase.controller';

@Module({
  providers: [SupabaseService],
  controllers: [SupabaseController],
  exports: [SupabaseService], 
})
export class SupabaseModule {}
