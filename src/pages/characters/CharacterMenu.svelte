<script>
  import { getCharactersQuery } from "../../queries/getCharacters";
  import { config } from "../../config";

  function loadCharacters() {
    return fetch(config.graphUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: getCharactersQuery,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const json = await response.json();
          console.log("characters", json);

          return json.data.characters.data;
        }
        return {};
      })
      .catch((reason) => {
        console.log("loadCharacters failed", reason);
      });
  }
  let query = loadCharacters();

  function selectCharacter(id) {
    console.log("id", id);
    window.location.hash = "#" + id;
    document.querySelector("body").classList.toggle("bottom");
  }
</script>

<style>
  .toolbar {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  .toolbar a,
  .toolbar a:visited {
    color: var(--third-accent);
    transition: color 500ms ease-in-out;
  }
  .toolbar a:hover,
  .toolbar a:active {
    color: var(--primary-accent);
    transition: color 500ms ease-in-out;
  }
</style>

{#await query}
  Loading...
{:then characters}
  {#if characters != null}
    {#each characters as character}
      <div class="menu-item" data-augmented-ui>
        <div on:click="{() => selectCharacter(character.id)}">
          <p><i class="bi bi-person text-primary"></i>{character.attributes.name}</p>
          <small>
            <div>{character.attributes.race.data.attributes.name}</div>
            <div>
              {character.attributes.roles.data
                .map((r) => r.attributes.name)
                .join(", ")}
            </div>
          </small>
        </div>
        <div class="toolbar">
          <a
            target="_blank"
            on:click|stopPropagation="{() => true}"
            href="/characters/print#{character.id}">
            <i class="bi bi-printer"></i>
          </a>
        </div>
      </div>
    {/each}
  {/if}
{:catch e}
  <div>{e}</div>
{/await}
