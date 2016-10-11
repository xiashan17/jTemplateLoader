<table class="table table-striped table-top20" id="ranking">
    <thead>
    <tr>
        <th>Oct 2016</th>
        <th>Oct 2015</th>
        <th>Change</th>
        <th>Programming Language</th>
        <th>Ratings</th>
        <th>Change</th>
    </tr>
    </thead>
    <tbody>
    {{#each data}}
    <tr>
         <td>{{oct2016}}</td>
         <td>{{oct2015}}</td>
         <td>{{{change}}}</td>
         <td>{{programminglanguage}}</td>
         <td>{{ratings}}</td>
         <td>{{change5}}</td>
    </tr>
    {{/each}}
    </tbody>
</table>