import { DocumentNode } from 'graphql'
import { Fragment } from './buildFragment'

function getAllDocumentNodes(fragment: Fragment): ReadonlyArray<DocumentNode> {
  const allDocumentNodes: Array<DocumentNode> = []
  fragment.dependencies.forEach((dependency) =>
    allDocumentNodes.push(...getAllDocumentNodes(dependency))
  )
  allDocumentNodes.push(fragment.fragment)
  return allDocumentNodes
}

export default (fragments: ReadonlyArray<Fragment> | Fragment): string => {
  const fragmentArray: ReadonlyArray<Fragment> = (Array.isArray(fragments)
    ? fragments
    : [fragments]) as ReadonlyArray<Fragment>

  const allDocumentNodes: Array<DocumentNode> = []

  for (const fragment of fragmentArray) {
    const documentNodes = getAllDocumentNodes(fragment)

    for (const documentNode of documentNodes) {
      if (!allDocumentNodes.find(node => node === documentNode)) {
        allDocumentNodes.push(documentNode)
      }
    }
  }

  return allDocumentNodes.map((node) => node.loc?.source.body).join('\n')
}
