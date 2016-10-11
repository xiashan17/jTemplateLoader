
jTemplateLoader

=====================
Most of the traditional template engine is to put the template in the page, is not conducive to the separation of the front and back, as a result of a large number of colleagues template HTML file is very large, is not conducive to the maintenance of traditional JS introduction

load template with ajax,just use script tag include,no use  amd or cmd


Usage
====================
under  brower 
<script type="text/javascript" src="/jTemplateLoader.min.js"></script>
1.load just one template 

     var data ={comment:'why developer hate product managers!',author:{name:"john"}};
        jTemplateLoader().load('/handlebarsTemplate/commentList.tpl',data,function(content){
            list.append(content);
        });

2.load muit template

 var tmplDatas={
            templates:["/handlebarsTemplate/ranking.tpl","/handlebarsTemplate/teamHistory.tpl","/handlebarsTemplate/hallOfFame.tpl"]
        };
        jTemplateLoader(tmplDatas).ready(function(){
            $.get("/ajax/ranking", function (result) {
                if (result.data) {
                    $("#table1").append(jTemplateLoader().html('/handlebarsTemplate/ranking.tpl',result));
                }
            });

            $.get("/ajax/teamHistory", function (result) {
                if (result.data) {
                    $("#table2").append(jTemplateLoader().html('/handlebarsTemplate/teamHistory.tpl',result));
                }
            });

            $.get("/ajax/hallOfFame", function (result) {
                if (result.data) {
                    $("#table3").append(jTemplateLoader().html('/handlebarsTemplate/hallOfFame.tpl',result));
                }
            });
        });

 
examples 
====================
npm install
npm run startServer


License
====================

MIT
