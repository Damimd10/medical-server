import { Field } from '@prisma/client';

export class FieldEntity implements Field {
  id: number;
  field_id: string;
  input_type: string;
  label: string;
  default_value: string;
  alternative_name: string[];
  full_name: string;
  right_label: string;
  created_at: Date;
  updated_at: Date;
  choices: string[];
  default_section: string;

  constructor(partial: Partial<FieldEntity>) {
    Object.assign(this, partial);
  }
}
