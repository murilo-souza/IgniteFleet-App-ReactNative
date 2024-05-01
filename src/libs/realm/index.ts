import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/historic'

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext({
    schema: [Historic],
  })
