export const getCharactersQuery = `
query {
    characters{
     data{
       id
       attributes{
         name
         race {
            data {
                 attributes{
                     name
                }
            }
         }
         roles {
            data {
                 attributes{
                     name
                }
            }
         }
       }
     }
   } 
}
`;
