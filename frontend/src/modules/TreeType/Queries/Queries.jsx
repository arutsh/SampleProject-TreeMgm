import { fetch } from "../../../interceptors/axios"

export class TreeTypesQueries{


/**
 * Returns list of tree typess fro given ids,
 * if ids is empty then returns all treee types
 * @param {*} param0 
 * @returns 
 */
static async getAllTreeTypes({ids=[]}){
    const graphql_body = JSON.stringify({
        'query': `query tree_types($ids: [ID]){
            allTreeTypes(treeTypeIds: $ids){
              createdOn,
              modifiedOn
              modifiedBy{
                username
                id
              }
              id,
              name,
              description,
              lifespan, 
              oxygen
              
            }
          }`,
        'variables': {
          ids: ids,
        }
      })

      const resp = await fetch({ data: graphql_body })
      if (resp.status) {
        return ({ status: true, data: resp.data['allTreeTypes'] })
      }
      return resp
}

static async createTreeType({name, desc=null,  lifespan=null, oxygen=null}){
    const graphql_body = JSON.stringify({
        'query': `mutation create_tree_types($name: String!, $desc: String, $lifespan: Int, $oxygen: Int) {
            createTreeType(
              name: $name
              description: $desc
              lifespan: $lifespan
              oxygen: $oxygen
            ) {
              treeType {
                id
              }
            }
          }`,
        'variables': {
          name: name,
          desc:desc,
          lifespan:lifespan,
          oxygen: oxygen
        }
      })

      const resp = await fetch({ data: graphql_body })
      if (resp.status) {
        return ({ status: true, data: resp.data['createTreeType'] })
      }
      return resp
}

}
