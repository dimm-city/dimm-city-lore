<script lang="ts">
    export let icon = "bi bi-missing";
    export let title = "Title";
    export let url = "#";
</script>

<a href={url}>
    <div class="menu-item" data-augmented-ui>
        <p><i class={icon} />{title}</p>
        <small><slot /></small>
    </div>
</a>

<style>
    a {
        text-decoration: none;
    }

</style>
