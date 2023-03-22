<script lang="ts">

    import type HrefLink from "../lib/HrefLink";

    export let hrefLinks: Array<HrefLink> = [];

    let respond: boolean = true;

    const handleLinkClick = (link:HrefLink) => {
        if (respond) {
            respond = false;
            link.action();
            setTimeout(()=>{respond = true}, 200);
        }
    }

    $: if (hrefLinks) {
        if (!Array.isArray(hrefLinks)) {
            hrefLinks=[hrefLinks];
        }
    }

</script>
<div class="cell-content">
    {#if Array.isArray(hrefLinks)}
        {#each hrefLinks as link}
            <a href="javascript:void(0)" on:click={(e)=>{handleLinkClick(link)}}>
                <span>{link.text}</span>
            </a>
        {/each}
    {/if}
</div>