import { Field } from '@prisma/client';

export class FieldEntity implements Field {
  id: number;
  fieldId: string;
  inputType: string;
  label: string;
  defaultValue: string;
  alternativeName: string[];
  fullName: string;
  rightLabel: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<FieldEntity>) {
    Object.assign(this, partial);
  }
}
