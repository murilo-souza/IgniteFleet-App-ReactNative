import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/historic'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
}

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext({
    schema: [Historic],
  })
