import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


class TimeEntry {
  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;
}

const TimeEntrySchema = SchemaFactory.createForClass(TimeEntry);

export { TimeEntry,TimeEntrySchema };