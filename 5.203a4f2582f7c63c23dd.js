(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Z9WT:function(e,t,o){"use strict";o.r(t),o.d(t,"DocumentationModule",function(){return y});var n=o("ofXK"),i=o("tyNb"),a=o("lJxs"),r=o("fXoL"),c=o("HRWH"),p=o("jhN1");let m=(()=>{class e{constructor(e,t,o){this.route=e,this.ghRepoService=t,this.sanitizer=o}ngOnInit(){this.html$=this.ghRepoService.pages$.pipe(Object(a.a)(e=>this.sanitizer.bypassSecurityTrustHtml(e))),this.route.params.subscribe(e=>this.ghRepoService.setPage(e.section))}}return e.\u0275fac=function(t){return new(t||e)(r.Jb(i.a),r.Jb(c.a),r.Jb(p.b))},e.\u0275cmp=r.Db({type:e,selectors:[["app-gh-page"]],decls:2,vars:3,consts:[["id","html-container",3,"innerHTML"]],template:function(e,t){1&e&&(r.Kb(0,"div",0),r.Wb(1,"async")),2&e&&r.ac("innerHTML",r.Xb(1,1,t.html$),r.ec)},pipes:[n.b],styles:[""]}),e})();var s=o("Gi7S");const h=function(e){return{selected:e}};function d(e,t){if(1&e){const e=r.Nb();r.Mb(0,"li",1),r.Tb("click",function(){r.dc(e);const o=t.$implicit;return r.Vb().onMenuClick(o)}),r.ic(1),r.Lb()}if(2&e){const e=t.$implicit,o=r.Vb();r.ac("ngClass",r.bc(2,h,e===o.currentText)),r.yb(1),r.kc(" ",e," ")}}let l=(()=>{class e{constructor(e,t,o){this.menuService=e,this.router=t,this.ghRepoService=o}ngOnInit(){}onMenuClick(e){this.currentText=e,document.body.clientWidth<900&&this.menuService.updatePosition(!1),this.router.navigate([this.ghRepoService.userName,this.ghRepoService.repositoryName,e])}}return e.\u0275fac=function(t){return new(t||e)(r.Jb(s.a),r.Jb(i.c),r.Jb(c.a))},e.\u0275cmp=r.Db({type:e,selectors:[["app-home-documentation"]],decls:8,vars:7,consts:[[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"ngClass","click"]],template:function(e,t){1&e&&(r.Mb(0,"main"),r.Mb(1,"aside"),r.Wb(2,"async"),r.Mb(3,"ul"),r.hc(4,d,2,4,"li",0),r.Wb(5,"async"),r.Lb(),r.Lb(),r.Mb(6,"section"),r.Kb(7,"router-outlet"),r.Lb(),r.Lb()),2&e&&(r.yb(1),r.Ab(r.Xb(2,3,t.menuService.menuOpen$)?"open":"closed"),r.yb(3),r.ac("ngForOf",r.Xb(5,5,t.ghRepoService.menuItems$)))},directives:[n.j,i.e,n.i],pipes:[n.b],styles:["app-home-documentation{width:100%}app-home-documentation path{color:#fff!important}app-home-documentation main{display:flex;width:100%;padding-top:3rem;overflow-y:auto;height:100%;transition:all .3s;background-color:#fff;padding-right:18rem;padding-left:18rem}app-home-documentation #html-container{padding:1rem;max-width:800px;margin:0 auto}app-home-documentation #html-container p{margin:.5rem 0;font-weight:300}app-home-documentation #html-container li{padding-bottom:.5rem}app-home-documentation #html-container h2{margin:1.5rem 0 .5rem;font-size:1.7rem}app-home-documentation #html-container h1{text-align:center;margin:2rem;font-size:2.5rem}app-home-documentation #html-container ol,app-home-documentation #html-container ul{font-weight:300;list-style:none}app-home-documentation #html-container img{max-width:100%;width:100%}app-home-documentation #html-container h3>code,app-home-documentation #html-container li>code,app-home-documentation #html-container p>code{background-color:#f3f3f3;font-family:monospace;padding:0 .1rem;border-radius:3px}app-home-documentation aside{overflow-y:auto;overflow-x:hidden;background-color:#f3f2f1;position:absolute;height:100%;width:18rem;left:0;transition:all .1s}app-home-documentation aside ul{padding:1rem .5rem}app-home-documentation aside li{padding:.5rem;margin-bottom:2px;border-radius:3px;cursor:pointer;overflow:hidden;text-overflow:ellipsis}app-home-documentation aside li.selected{font-weight:700}app-home-documentation aside li:hover{background-color:#e5e5e6}app-home-documentation section{width:100%}app-home-documentation .open{left:0}app-home-documentation .closed{left:-100%}@media screen and (max-width:1280px){app-home-documentation main{padding-right:0}}@media screen and (max-width:900px){app-home-documentation aside{height:100%;left:-100%;width:100%;background-color:#fff}app-home-documentation aside li{text-align:center;max-width:100%}app-home-documentation main{padding-left:0}app-home-documentation aside.open{position:absolute}app-home-documentation #html-container h1{margin:1rem 0}}"],encapsulation:2,changeDetection:0}),e})();var u=o("vkgz"),b=o("ht3A");let g=(()=>{class e{constructor(e,t){this.ghApi=e,this.ghRepo=t}resolve(e,t){const[o,n]=t.url.slice(1).split("/");return this.ghRepo.userName=o,this.ghRepo.repositoryName=n,this.ghApi.getReadme(o,n).pipe(Object(u.a)(e=>this.ghRepo.parseMd(e)))}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(b.a),r.Qb(c.a))},e.\u0275prov=r.Fb({token:e,factory:e.\u0275fac}),e})();const f=[{path:"",component:l,resolve:{readme:g},children:[{path:":section",component:m},{path:"**",redirectTo:"home"}]}];let v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.Hb({type:e}),e.\u0275inj=r.Gb({imports:[[i.d.forChild(f)],i.d]}),e})();var w=o("d2mR");let y=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.Hb({type:e}),e.\u0275inj=r.Gb({providers:[g],imports:[[n.c,v,w.a,i.d]]}),e})()}}]);