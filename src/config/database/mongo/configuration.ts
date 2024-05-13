import { MongooseModule } from '@nestjs/mongoose';
import settings from '@/common/constants/settings';

export default {
    ConfigMongooseModule: MongooseModule.forRoot(settings.MONGODB_URL)
}