<table class="table table-striped" id="hall">
    <colgroup>
        <col align="center">
        <col align="center">
    </colgroup>
    <tbody>
    <tr>
        <th nowrap="" align="center">Year</th>
        <th nowrap="" align="center">Winner</th>
    </tr>
   {{#each data}}
       <tr>
            <td>{{year}}</td>
            <td>{{{winner}}}</td>
       </tr>
   {{/each}}
    </tbody>
</table>