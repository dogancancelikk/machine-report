import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
    uri: 'http://dev.prowmes.com/panel/api/graphql/v2',
    cache
});


export const getAllMachines = async () => {
    return client.query({
        query: GET_MACHINES_ENTITIES_QUERY
    });
}

export const findMachineStatsByID = async (machineID: string) => {
    return client.query({
        query: GET_MACHINE_STATS_BY_ID_QUERY,
        variables: {
            id: 1
        }
    });
}


const GET_MACHINE_STATS_BY_ID_QUERY = gql`
   query machineStats($id: String){
         machineStats(id: $machineID){
                id
                prodAmount
                oee
         }
      }
`;

const GET_MACHINES_ENTITIES_QUERY = gql`
   query machineStats($id: String){
         machineStats(id: $machineID){
                id
                prodAmount
                oee
         }
      }
`;
