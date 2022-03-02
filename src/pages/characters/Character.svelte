<script lang="ts">
  import { onMount } from "svelte";
  import { getCharacterQuery } from "../../queries/getCharacter.js";
  import { config } from "../../config";
  let id = document ? document.location.hash.replace("#", "") : 0;
  let character;
  let query = new Promise(() => {}); // loadCharacter();
  function loadCharacter() {
    return fetch(config.graphUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: getCharacterQuery,
        variables: { id },
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const json = await response.json();
          console.log("data", json);

          character = json.data.character.data
            ? json.data.character.data.attributes
            : null;
          return character;
        }
        return null;
      })
      .catch((reason) => {
        console.log("loadCharacter failed", reason);
      });
  }

  function hashChanged(e: HashChangeEvent) {
    id = e.newURL.split("#").at(1).replace("#", "");
    console.log("hashchanged", id, e);
    if (id != null) query = loadCharacter();
  }
  onMount(() => {
    window.addEventListener("hashchange", hashChanged);
    document
      .getElementsByClassName("content-wrapper")
      .item(0)
      .classList.add("full-size");

    return () => {
      window.removeEventListener("hashchange", hashChanged);
    };
  });
</script>

<style>
  .title-container {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
  }
  .title-container div {
    display: block;
    text-align: center;
  }
  .title-container h1,
  .title-container h5 {
    display: block;
  }
  ul {
    list-style: none;
  }
  .container {
    display: grid;
    grid-template-columns: 1.2fr 0.7fr 1.1fr;
    grid-template-rows: 0.1fr 0.2fr 0.2fr 0.9fr 0.9fr;
    gap: 0px 1em;
    grid-auto-flow: row;
    align-content: start;
    grid-template-areas:
      ". . image"
      ". details image"
      ". details image"
      ". . ."
      ". abilities abilities";
    width: 100%;
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
    width: max-content;
  }

  .details > div {
    padding-bottom: 0.25rem;
  }

  .stats > h4 {
    display: inline;
    font-size: 1.5rem;
  }
  .stats > h4:first-of-type {
    padding-right: 0.5rem;
  }
  .abilities {
    grid-area: abilities;
  }

  .container > div {
    padding: 0.5rem;
    border-top: 1px solid #dfdfdf;
  }

  img {
    max-height: 300px;
  }
</style>

<div class="title-container">
  <div>
    <h1>Dimm City</h1>
    <h5>Character Sheet</h5>
  </div>
</div>
{#await query}
  Loading...
{:then}
  {#if character != null}
    <div class="parent">
      <div class="container">
        <div>Name:{character.name}</div>
        <div class="stats">
          <h4>HP: {character.hp || 10}</h4>
          <h4>AP: {character.ap || 10}</h4>
        </div>
        <div class="details">
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
            {#each character.roles.data as role}
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

        <div>
          Racial Abilities
          <ul>
            {#each character.race.data.attributes.abilities.data as ability}
              <li>
                <a href="#{ability.attributes.slug}">
                  {ability.attributes.name}</a>
              </li>
            {/each}
          </ul>
        </div>
        <div>Captial</div>
        <div>Cybernetics</div>

        <div class="items">Items</div>
        <div class="abilities">
          Abilities
          <ul>
            {#each character.selectedAbilities.data as ability}
              <li>
                <a href="#{ability.attributes.slug}">
                  {ability.attributes.name}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
{/await}
