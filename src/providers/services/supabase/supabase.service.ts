import settings from '@constants/settings';
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor() {
    this.supabase = createClient(settings.SUPABASE_URL, settings.SUPABASE_KEY);
  }

  async verifyToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error) {
      throw new Error('Invalid token');
    }

    return data.user;
  }
}
