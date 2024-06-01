import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

class CustomField {
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    type: string;
  
    @Prop({ required: true })
    value: any;
  
    @Prop({ required: true })
    position: number;
}

const CustomFieldSchema = SchemaFactory.createForClass(CustomField);

export { CustomField, CustomFieldSchema}