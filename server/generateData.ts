const { faker } = require('@faker-js/faker')
const fs = require('fs')
const brokers = require('./brokers.json')
const accountStatus = require('./accountStatus.json')

faker.setLocale('ko')

const users = []
const userSetting = []
const accounts = []

const brokercode = Object.keys(brokers)
const accountStatusCode = Object.values(accountStatus)

let acc_id = 1

for (let i = 1; i < 101; i++) {
  const id = faker.datatype.number()
  const uuid = faker.datatype.uuid()
  const user = {
    id: i,
    uuid,
    photo: faker.internet.avatar(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    age: faker.datatype.number({ min: 20, max: 66 }),
    gender_origin: faker.datatype.number({ min: 1, max: 4 }),
    birth_date: faker.date.birthdate({ min: 20, max: 65, mode: 'age' }),
    phone_number: faker.phone.number('010-####-####'),
    address: `${faker.address.country()} ${faker.address.city()}`,
    detail_address: faker.address.streetAddress(true),
    last_login: faker.date.between('2022-01-01', '2022-08-01'),
    created_at: faker.date.between('2019-04-01', '2022-08-01'),
    updated_at: faker.date.between('2019-04-01', '2022-08-01'),
  }
  const setting = {
    id,
    uuid,
    allow_marketing_push: faker.datatype.boolean(),
    allow_invest_push: faker.datatype.boolean(),
    is_active: faker.datatype.boolean(),
    is_staff: faker.datatype.boolean(),
    created_at: faker.date.between('2019-04-01', '2022-08-01'),
    updated_at: faker.date.between('2019-04-01', '2022-08-01'),
  }
  users.push(user)
  userSetting.push(setting)

  // generate fake accounts
  for (let j = 1; j < faker.datatype.number({ min: 2, max: 11 }); j++) {
    const accountBrokerCode = brokercode.sort(() => 0.5 - Math.random())[0]
    const status = accountStatusCode.sort(() => 0.5 - Math.random())[0]
    const account = {
      id: acc_id++,
      user_id: i,
      uuid: faker.datatype.uuid(),
      broker_id: accountBrokerCode,
      status,
      number: faker.finance.account(12),
      name: faker.finance.accountName(),
      assets: faker.finance.amount(200000, 1000000000),
      payments: faker.finance.amount(200000, 1000000000),
      is_active: faker.datatype.boolean(),
      created_at: faker.date.between('2019-04-01', '2022-08-01'),
      updated_at: faker.date.between('2019-04-01', '2022-08-01'),
    }
    accounts.push(account)
  }
}

const data = { users, userSetting, accounts }
fs.writeFileSync('db.json', JSON.stringify(data))
console.log('...generated db.json')
