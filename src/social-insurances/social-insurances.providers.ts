import { DataSource } from 'typeorm';

import { SocialInsurance } from './entities/social-insurance.entity';

export const socialInsuranceProviders = [
  {
    provide: 'SOCIAL_INSURANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SocialInsurance),
    inject: ['DATA_SOURCE'],
  },
];
