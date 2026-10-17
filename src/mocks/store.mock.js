import { faker } from '@faker-js/faker';

export const generateMockStore = (ownerId, index) => ({
  name: `Comercio Demo ${index}`,
  address: `Av. Siempre Viva ${700 + index}`,
  owner: ownerId,
  isActive: true,
});

export const generateMockStores = (qty, users) => {
  return Array.from({ length:qty}, (_, index) => generateMockStore(users.length <= 0 ? null : faker.helpers.arrayElement(users), index + 1));
};