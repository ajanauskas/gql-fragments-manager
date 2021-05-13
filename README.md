# graphql-fragments-manager

`graphql-fragments-manager` helps with managing fragment dependencies when declaring graphql Queries, Mutations, Subscriptions

## Example:

```javascript
import { buildFragment, includeFragments } from 'graphql-fragments-manager'

const UserPhotoVersionFragment = buildFragment(
  gql`
    fragment UserPhotoVersionFragment on UserPhotoVersion {
      width
      height
      version
    }
  `
)

const UserPhotoFragment = buildFragment(
  gql`
    fragment UserPhotoFragment on UserPhoto {
      url
      versions {
        ...UserPhotoVersionFragment
      }
    }
  `,
  [UserPhotoVersionFragment]
)

const UserFragment = buildFragment(
  gql`
    fragment UserFragment on User {
      id
      photo {
        ...UserPhotoFragment
      }
    }
  `,
  [UserPhotoFragment]
)

const QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }

  ${includeFragments(UserFragment)}
`

/// INSTEAD OF:

const QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }

  ${UserFragment}
  ${UserPhotoFragment}
  ${UserPhotoVersionFragment}
`
```

`includeFragments` function will gather dependencies on all included fragments and will include all necessary fragments that are necessary for graphql. This helps avoid runtime errors when fragments are complex, with many nested fragments.
