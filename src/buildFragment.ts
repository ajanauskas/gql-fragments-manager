import { DocumentNode } from 'graphql'

export type Fragment = {
  fragment: DocumentNode
  dependencies: ReadonlyArray<Fragment>
}

export default (
  fragment: DocumentNode,
  dependencies: ReadonlyArray<Fragment> | Fragment | undefined = undefined
): Fragment => ({
  fragment,
  dependencies:
    (dependencies &&
      ((Array.isArray(dependencies) ? dependencies : [dependencies]) as ReadonlyArray<Fragment>)) ||
    [],
})
