import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

class CustomFieldValue {
    @Prop({ required: true, type: Types.ObjectId, ref: "CustomField" })
    customFieldId: string;
  
    @Prop()
    value?: Array<Object>;
}

const CustomFieldValueSchema = SchemaFactory.createForClass(CustomFieldValue);

export { CustomFieldValue, CustomFieldValueSchema}