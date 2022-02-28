export const getCharacterQuery =`
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
          characterRoles {
            data {
              attributes {
                name
              }
            }
          }
          race {
            data {
              attributes {
                name
              }
            }
          }
          selectedAbilities {
            data {
              id
              attributes {
                name
              }
            }
          }
          currentLocation {
            data {
              attributes {
                name
              }
            }
          }
          selectedAbilities {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
