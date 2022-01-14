<script>
  import { onMount } from 'svelte'
  import { query } from './sqlite'

  const parsedQueryString = location.search.split('=')
  let sql = unescape(parsedQueryString.length > 1 ? parsedQueryString[1] : '')
  let error = ``
  let results = []
  let noQueryRan = true

  const runQuery = async () => {
    error = ``
    noQueryRan = false
    try {
      results = await query(sql)
    } catch (e) {
      error = await e.toString()
    }
    // console.log(sql)
  }

  // If location.search was passed, it must be a query: run it and we're done.
  onMount(() => location.search && runQuery())
</script>


<!-- Query maybe passed in qs (scriptkit); if so, DONT render query input/button. -->
{#if !location.search }
  <h2>Enter raw query:</h2>
  <textarea bind:value={sql} cols="60" rows="15"></textarea>
  <p>
    <button on:click={runQuery}>Run</button>
    Tip: run CLI with -D to get queries and paste them above...
  </p>
{/if}


<div id="results">
  {#if noQueryRan}
    <p></p>
  {:else if error}
    <p>{error}</p>
  {:else if !results.length}
    <p>The query yielded no results</p>
  {:else}
    <table>
      <thead>
        <tr>
          {#each Object.keys(results[0]) as header}
            <td>{header}</td>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each results as row}
          <tr>
            {#each Object.entries(row) as [colname, value]}
              <td width={colname == 'verse' ? '300' : ''}>{value}</td>
            {/each}
          </tr>
        {/each}
        </tbody>
    </table>
  {/if}
</div>



<style>
  #results {
    margin: 30px;
  }
  thead {
    background-color: #cacaca;
  }
  thead td {
    padding: 20px;
  }
  tbody td {
    padding: 3px;
  }
  button {
    height: 40px;
    width: 60px;
    margin: 0 30px;
  }
</style>
