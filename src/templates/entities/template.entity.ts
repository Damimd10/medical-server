import { Template } from '@prisma/client';

export class TemplateEntity implements Template {
  id: number;
  name: string;
  templateType: string;
  alternativeName: string[];
  createdAt: Date;
  updatedAt: Date;
  specializationId: number;

  constructor(partial: Partial<TemplateEntity>) {
    Object.assign(this, partial);
  }
}
