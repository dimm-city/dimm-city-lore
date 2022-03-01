export const getCharacterQuery = `
  query getCharacter($id: ID!) {
    character(id: $id) {
      data {
        attributes {
          name
          age
          height
          weight
          pronouns
          eyes
          skin
          hair
          vibe
          clothing          
          race {
            data {
              attributes {
                name
                slug
                abilities{
                  data{
                    attributes{
                      name
                      slug
                    }
                  }
                }
              }
            }
          } 
          roles {
            data {
              attributes {
                name
                slug
              }
            }
          }         
          currentLocation {
            data {
              attributes {
                name
                slug
              }
            }
          }
          selectedAbilities {
            data {
              attributes {
                name
                slug
              }
            }
          }
          items {
            data {
              attributes {
                name
                slug
              }
            }
          }       
        }
      }
    }
  }
`;
