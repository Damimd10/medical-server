import { Organization } from '@prisma/client';
import { TemplateEntity } from 'src/templates/entities/template.entity';

export class OrganizationEntity implements Organization {
  id: number;
  name: string;
  created_at: Date;
  template_id: number;
  template: TemplateEntity;

  constructor(partial: Partial<OrganizationEntity>) {
    Object.assign(this, partial);
  }
}
