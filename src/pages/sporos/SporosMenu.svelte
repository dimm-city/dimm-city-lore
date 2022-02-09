<script>
    import { ethers } from "ethers";
    import ContractConfig from "../../contracts/DimmCityV1Base.json";

    let sporos = [];
    async function connect() {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // // MetaMask requires requesting permission to connect users accounts
        // await provider.send("eth_requestAccounts", []);

        // // The MetaMask plugin also allows signing transactions to
        // // send ether and pay to change state within the blockchain.
        // // For this, you need the account signer...
        // const signer = provider.getSigner();

        const contract = new ethers.Contract(
            "0xeF48DF1d388aa7222Da0B83d8b7CB265EF8d0B4a",
            ContractConfig.abi,
            provider
        );

        console.log(contract);
        let total = await contract.totalSupply();
        let downloads = [];
        for (let index = 1; index <= total; index++) {
            sporos.push({
                id: index,
            });
            downloads.push(
                fetch(`http://localhost:7071/api/v1/sporos/s1r1/${index}.json`).then(async (res) => {
                    console.log("loaded", index);
                    if (res.ok) {
                        const data = await res.json();
                        let i = sporos.findIndex((s) => s.id === data.id);
                        sporos[i] = data;
                    }
                })
            );
        }
    }

    async function searchSporos(query) {
        await connect();
        return [];
    }
</script>
<style>
    a {
        text-decoration: none;
    }
</style>
<button on:click={searchSporos}>search</button>

<div class="menu">
    <div class="menu-items">
        {#each sporos as sporo}
            <a class="menu-item" data-augmented-ui href="#{sporo.id}">{sporo.id} - {sporo.name}</a>
        {/each}
    </div>
</div>
