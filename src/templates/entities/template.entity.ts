import { Template } from '@prisma/client';

export class TemplateEntity implements Template {
  id: number;
  name: string;
  template_type: string;
  alternative_name: string[];
  created_at: Date;
  updated_at: Date;
  specialization_id: number;
  description: string;

  constructor(partial: Partial<TemplateEntity>) {
    Object.assign(this, partial);
  }
}
