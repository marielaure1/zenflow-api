import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

class CustomField {
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    type: string;
  
    @Prop()
    value?: string;
  
    @Prop()
    position?: number;
}

const CustomFieldSchema = SchemaFactory.createForClass(CustomField);

export { CustomField, CustomFieldSchema}