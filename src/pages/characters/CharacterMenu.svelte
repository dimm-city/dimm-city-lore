<script>
  import MenuItem from "../../components/MenuItem.svelte";
  import { getCharactersQuery } from "../../queries/getCharacters";

  const url = "http://localhost:1337/graphql";
  function loadCharacters() {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: getCharactersQuery,
      }),
    }).then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        console.log("characters", json);

        return json.data.characters.data;
      }
      return {};
    });
  }
  let query = loadCharacters();

  function selectCharacter(id) {
    console.log('id', id);
    window.location.hash = '#' + id;
    document.querySelector("body").classList.toggle("bottom");
  }
</script>

{#await query}
  Loading...
{:then characters}
  {#each characters as character}
    <div on:click="{() => selectCharacter(character.id)}">
      <MenuItem icon="bi bi-person" title="{character.attributes.name}">
        <div>{character.attributes.race.data.attributes.name}</div>
        <div>
          {character.attributes.roles.data.map(r => r.attributes.name).join(', ')}
        </div>
      </MenuItem>
    </div>
  {/each}
{:catch e}
  <div>{e}</div>
{/await}
