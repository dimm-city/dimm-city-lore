<script lang="ts">
  import { onMount } from "svelte";
  import { getCharacterQuery } from "../../queries/getCharacter.js";
  let id = 1;
  //const url = "https://dimm-city-data.azurewebsites.net/graphql";
  const url = "http://localhost:1337/graphql";
  let query = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getCharacterQuery,
      variables: { id },
    }),
  }).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return json.data.character.data.attributes;
    }
    return {};
  });
  onMount(() => {
    document
      .getElementsByClassName("content-wrapper")
      .item(0)
      .classList.add("full-size");
  });
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }
  ul {
    list-style: none;
  }
  .container {
    display: grid;
    grid-template-columns: 1.2fr 0.7fr 1.1fr;
    grid-template-rows: 0.2fr 0.2fr 0.2fr 0.9fr 0.9fr;
    gap: 0px 1em;
    grid-auto-flow: row;
    align-content: start;
    grid-template-areas:
      ". details image"
      ". details image"
      ". details image"
      ". . ."
      ". . .";
    width: 90%;
    height: 100%;
  }

  .image {
    grid-area: image;
    height: max-content;
    display: flex;
    justify-content: center;
  }

  .details {
    grid-area: details;
  }

  .container > div {
    padding: 0.5rem;
    border-top: 1px solid #dfdfdf;
  }

  img {
    max-height: 300px;
  }
</style>

<h1>Dimm City</h1>
<h2>Character Sheet</h2>
{#await query}
  Loading...
{:then character}
  <div class="parent">
    <div class="container">
      <div>Name:{character.name}</div>
      <div class="details">
        HP: {character.hp || 10}
        AP: {character.ap || 10}
        <div>Pronouns: {character.pronouns || "they/them"}</div>
        <div>Age: {character.age || 0} years</div>
        <div>Height: {character.height || 0} m</div>
        <div>Weight: {character.weight || 0} kg</div>
        <div>Eyes: {character.eyes || ""}</div>
        <div>Skin: {character.skin || ""}</div>
        <div>Hair: {character.hair || ""}</div>
        <div>Vibe: {character.vibe || ""}</div>
        <!-- <div>Accessories: {character.height}</div> -->
      </div>
      <div>
        Role(s):
        <ul>
          {#each character.characterRoles.data as role}
            <li>{role.attributes.name}</li>
          {/each}
        </ul>
      </div>
      <div>Race: {character.race.data.attributes.name}</div>

      <div class="image">
        <img
          src="https://lh3.googleusercontent.com/TFxb5LSw_-CdlY_JZ27-LBYzwCallPv6ZLNJQrhWSOoUUy2YKnd1VqZaOjotTPk-hjZ73UiC0kaCbb__4lbJ2_CYxFjN8iYqX37m5g=w600"
          alt="" />
      </div>
      <div>Racial Traits</div>
      <div>
        Abilities
        <ul>
          {#each character.selectedAbilities.data as ability}
            <li><a href="#{ability.id}"> {ability.attributes.name}</a></li>
          {/each}
        </ul>
      </div>
      <div>Items</div>
      <div>Cybernetics</div>
      <div>Captial</div>
      <div></div>
    </div>
  </div>
{/await}
