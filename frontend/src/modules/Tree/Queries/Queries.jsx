import { fetch } from "../../../interceptors/axios"

export class TreeQueries{


  /**
   * Returns list of trees for the given ids,
   * if ids is empty then returns all trees
   * @param {*} param0 
   * @returns 
   */
  static async getAllTrees({ids=[]}){
      const graphql_body = JSON.stringify({
          'query': `query trees($ids:[ID]){
            allTrees(treeIds:$ids){
              id
              identifier
              location
              type{
                id
                name
              }
              modifiedOn
              plantedOn
              
            }
          }`,
          'variables': {
            ids: ids,
          }
        })

        const resp = await fetch({ data: graphql_body })
        if (resp.status) {
          return ({ status: true, data: resp.data['allTrees'] })
        }
        return resp
  }


/**
 * Creates new Tree 
 * @param {*} param0 
 * @returns 
 */
static async createTree({identifier, type, location=null,  planted_on=null}){
  console.log("received data is ", identifier, type)
    const graphql_body = JSON.stringify({
        'query': `mutation create_tree($identifier: String!, $type_id: ID!, $location: String, $planted_on: Date)
        {
          createTree(identifier:$identifier, typeId: $type_id, location: $location, plantedOn:$planted_on){
            tree{
              id
              identifier
              location
              plantedOn
              type{
                id
                name
              }
              modifiedOn
            }
          }
        }`,
        'variables': {
          identifier: identifier,
          location:location,
          planted_on:planted_on,
          type_id: type
        }
      })

      const resp = await fetch({ data: graphql_body })
      if (resp.status) {
        return ({ status: true, data: resp.data['createTree'].tree })
      }
      return resp
}

/**
 * Delete tree  by given ids
 * @param {*} param0 
 * @returns 
 */

static async deleteTree({ids}){
  
  const graphql_body = JSON.stringify({
      'query': `mutation delete_trees($ids: [ID]!){
        deleteTrees(ids:$ids){
          tree
        }
      }`,
      'variables': {
        ids: ids
      }
    })

    const resp = await fetch({ data: graphql_body })
    if (resp.status) {
      return ({ status: true, data: resp.data['deleteTrees'] })
    }
    return resp
}

/**
 * Update tree  with id with given details
 * @param {*} param0 
 * @returns 
 */
static async UpdateTree({id, identifier, type,  location=null, planted_on=null}){
  const graphql_body = JSON.stringify({
      'query': `mutation update_tree($id:ID!, $identifier: String, $type_id:ID, $location:String,$planted_on: Date){
        updateTree(id: $id, identifier:$identifier, typeId: $type_id, location:$location, plantedOn:$planted_on){
          tree{
            id
            identifier
            location
            plantedOn
            modifiedOn
            type{
              id
              name
            }
          }
        }
      }`,
      'variables': {
        id: id,
        identifier: identifier,
        location:location,
        planted_on:planted_on,
        type_id: type
      }
    })

    const resp = await fetch({ data: graphql_body })
    if (resp.status) {
      return ({ status: true, data: resp.data['updateTree'].tree })
    }
    return resp
}



}
